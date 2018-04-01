<?php
require_once ('Database.php');
require_once ('BookData.php');
// JSON


class BooksDataSet
{
    protected $_dbHandle, $_dbInstance;

    /**
     * BooksDataSet constructor.
     */
    public function __construct() {

        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
    }

    /**
     * The method is invoked when a user clicks one a product from the shop list page and hence
     * the book object is returned with its particular state.
     * @param $field
     * @param $idBook
     * @return BookData
     */
    public function searchBook($field ,$idBook){

        $sqlQuery = "SELECT * FROM Books WHERE $field = '$idBook'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement
        $dataSet = [];
        while ($row = $statement->fetch()) {
            $dataSet = new BookData($row);
        }
        return $dataSet;
    }

    /**
     * The method returns the id of a particular book.
     * @param $id
     * @return BookData
     */
    public function fetchBook($id) {

        $sqlQuery = "SELECT * FROM Books WHERE idBook =  ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1, $id, PDO::PARAM_STR);
        $statement->execute(); // execute the PDO statement

        $row = $statement->fetch();
        $dataSet = new BookData($row);

        return $dataSet;
    }


    /**
     * The method is called when a user wants to choose the way the products are displayed on
     * the shop list page.
     * @param $category
     * @param $price
     * @return array
     */
    public function searchFor($category, $price, $start, $limit)
    {
        $order = $this->test_input($price);
        $sqlQuery = "SELECT * FROM Books WHERE idBook > 0";
        $findings = array();
        if($category != "" && $category != null){
            $sqlQuery .= " AND category = :category ";
            $findings['category'] = $category;
        }
        if ($price != "" && $price != null) {
            $sqlQuery .= " ORDER BY price $order limit :start, :end";
            $findings['start'] = $start;
            $findings['limit'] = $limit;
        }
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
//        $statement->bindParam(':cat',$category, PDO::PARAM_STR);
//        $statement->bindValue(1, (int) trim($start), PDO::PARAM_INT);
//        $statement->bindValue(2, (int) trim($limit), PDO::PARAM_INT);
        $statement->execute($findings); // execute the PDO statement

        $dataSet = [];
        while ($row = $statement->fetch()) {
            $dataSet[] = new BookData($row);
        }
        var_dump($dataSet);
        return $dataSet;
    }

    /**
     * The method returns all the books from the database according to specific parameters passed for
     * displaying items on the shop list dynamically.
     * @return array
     */
    public function fetchAllBooks($start, $limit)
    {
        $sqlQuery = "SELECT * FROM Books WHERE numberInStock > 0 LIMIT ?, ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindValue(1, (int) trim($start), PDO::PARAM_INT);
        $statement->bindValue(2,(int) trim($limit), PDO::PARAM_INT);
        $statement->execute(); // execute the PDO statement

        $dataSet = [];
        $j = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $j['AllBooks'][] = $row;
            $dataSet[] = new BookData($row);
        }
//        $obj = $dataSet[0];
//        $arr = json_encode($obj->getBookName());
//        var_dump($arr);
//        echo json_encode($j);
//        echo '</br>';
//        var_dump($dataSet);
        return $dataSet;
    }

    /**
     * @return PDO
     */
    public function generateJSON($object){
        for($i=0; $i<sizeof($object); $i++){
            var_dump(json_encode(serialize($object)));
        }
        return $object;
    }

    /**
     * The method returns all the books from the database according to specific parameters passed for
     * displaying items on the shop list dynamically.
     * @return array
     */
    public function fetchBooks()
    {
        $sqlQuery = "SELECT * FROM Books WHERE numberInStock > 0";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement

        $dataSet = [];
        while ($row = $statement->fetch()) {
            $dataSet[] = new BookData($row);
        }
        return $dataSet;
    }



    /**
     * The method returns a particular by passing two parameters as conditions for the product to be
     * search for.
     * @param $field
     * @param $value
     * @return array|BookData
     */
    public function searchForBook($field, $value) {

        $sqlQuery = "SELECT bookName FROM Books Where $field LIKE '$value' OR 
        author LIKE '$value'";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->execute();

        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet[] = new BookData($row);
        }
        return $dataSet;
    }

    /**
     * The method is invoked to update the status of a book object, and it si flexible in doing it do
     * because of its parameters.
     * @param $value
     * @param $id
     */
    public function updateProduct($value, $id){

        $sqlQuery = "UPDATE Books SET numberInStock = ? WHERE idBook = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->bindParam(1, $value, PDO::PARAM_STR);
        $statement->bindValue(2, $id, PDO::PARAM_INT);
        $statement->execute();
    }

// search back end !
//    /**
//     * The method is invoked when a searches for a book based on some text, either author name or
//     * book name, for instance.
//     * @param $attribute
//     * @return array
//     */
//    public function searchByAttribute($attribute)
//    {
//        $attributeTested = $this->test_input($attribute);
//        $sqlQuery = "SELECT * FROM Books WHERE idBook > 0";
//        if  ($attributeTested != "" && $attributeTested != null) {
//            $sqlQuery .= " AND (bookName LIKE '%$attributeTested%' OR author LIKE '%$attributeTested%') ";
//        }
//
//        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
//        $statement->execute(); // execute the PDO statement
//
//        $dataSet = [];
//        while ($row = $statement->fetch()) {
//            $dataSet[] = new BookData($row);
//        }
//
//        if(empty($dataSet)){
//            echo '<script>alert("No results found! Please try again.")</script>';
//            return $dataSet;
//        }
//        else {
//            return $dataSet;
//        }
//
//
//    }

    /**
     * The method counts the number of items from the Book relation and it is used as part of the
     * checking out process.
     * @return int
     */
    public function countItems(){
        $sqlQuery = 'SELECT * FROM Books';
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->execute();
        return $statement->rowCount();
    }


    public function countFilters($category, $price){

        $sqlQuery = "SELECT * FROM Books WHERE idBook > 0";
        if($category != "" && $category != null){
            $sqlQuery .= " AND category = ? ";
        }
        if ($price != "" && $price != null) {
            $sqlQuery .= " ORDER BY ?";
        }
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$category, PDO::PARAM_STR);
        $statement->bindParam(2,$price, PDO::PARAM_STR);
        $statement->execute(); // execute the PDO statement

        return $statement->rowCount();
    }

    /**
     * The method tests the user input in a securely manner.
     * @param $data
     * @return string
     */
    public function test_input($data) {
        if(empty($data) || is_null($data))
        {
            echo '<script>alert("You need to type in order to to search for a book")</script>';
        }
        else {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
    }

    // JSON WORK

    protected $output;

    public function setOutput(OutputInterface $outputType){
        $this->output = $outputType;
    }

    public function loadOutput($arrayOfData){
        return $this->output->load($arrayOfData);
    }
}