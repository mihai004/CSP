<?php
require_once ('Database.php');
require_once ('BookData.php');

class BooksDataSet
{
    protected $_dbHandle, $_dbInstance, $output;

    /**
     * BooksDataSet constructor.
     */
    public function __construct() {

        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
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
     * The method returns results based on the the arguments passed as filters.
     * @param $category
     * @param $nrInStock
     * @param $price
     * @return array
     */
    public function searchBy($category, $nrInStock, $price){
        $this->test_input($price);
        $sqlQuery = "SELECT * FROM Books WHERE category = ? AND numberInStock >= ? ORDER BY price $price";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->bindParam(1, $category, PDO::PARAM_STR);
        $statement->bindParam(2, $nrInStock, PDO::PARAM_STR);
        $statement->execute();
        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet[] = new BookData($row);
        }
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
        return $dataSet;
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
        return null;
    }

    /**
     * Searches dynamically for results, based on the parameter passed, in the dataBase.
     * @param $keyword
     * @return array
     */
    public function searchingFor($keyword){
        $sqlQuery = "SELECT * FROM Books WHERE bookName LIKE :keyword OR author LIKE :keyword";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(':keyword',$keyword);
        $statement->execute(); // execute the PDO statement
        $dataSet = [];
        while ($row = $statement->fetch()) {
            $dataSet[] = new BookData($row);
        }
        return $dataSet;
    }

    // JSON Work

    /**
     * Sets the type of output (array, Json, XML).
     * @param OutputInterface $outputType
     */
    public function setOutput(OutputInterface $outputType){
        $this->output = $outputType;
    }

    /**
     * Load Data accordingly
     * @param $arrayOfData
     * @return mixed
     */
    public function loadOutput($arrayOfData){
        return $this->output->load($arrayOfData);
    }
}