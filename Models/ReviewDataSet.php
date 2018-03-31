<?php
require_once ('Database.php');
require_once('ReviewData.php');
// JSON
require ('OutputInterface.php');
require ('SerializedArrayOutput.php');
require ('JsonStringOutput.php');
require ('ArrayOutput.php');

class ReviewDataSet
{

    protected $_dbHandle, $_dbInstance;

    /**
     * CommentDataSet constructor.
     */
    public function __construct() {

        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
    }

    /**
     * @param $bookId
     * @param $message
     */
    public function insertComment($bookId, $message) {

        $comment = $this->test_input($message);
        if($comment === '' || $comment === null){
            echo 'You need to type a message, before submitting it';
        }
        else
        {
            $email = $_SESSION['userEmail'];
            $com  = $message;
            $idBook = $bookId;
            $date = strval(date("d-m-Y"));
            $sqlQuery = "INSERT INTO Reviews (idBook, emailUser, dateTime, comments) VALUES (?, ?, ?, ?)";
            $statement = $this->_dbHandle->prepare($sqlQuery);
            $statement->bindParam(1, $idBook, PDO::PARAM_INT);
            $statement->bindParam(2, $email, PDO::PARAM_STR);
            $statement->bindParam(3, $date, PDO::PARAM_STR);
            $statement->bindParam(4, $com, PDO::PARAM_STR);
            if($statement->execute())
            {
                echo 'Thank you for your time!';
            }
            else {
                echo 'Review not submitted';
            }
        }
    }

    /**
     * The method tests securely what the user types as input
     * @param $data
     * @return string
     */
    public function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }


//    public function getJsonFormat($id){
//        $sqlQuery = "SELECT * FROM Reviews WHERE idBook = ?";
//        $statement = $this->_dbHandle->prepare($sqlQuery);
//        $statement->bindParam(1, $id, PDO::PARAM_INT);
//        $statement->execute();
//        //$row = $statement->fetchAll(PDO::FETCH_ASSOC);
//        $jsonArray = array();
//       // $jsonArray = $row;
//        //var_dump(json_encode($jsonArray));
//       // return $jsonArray;
//        $i = 0;
//        while($row = $statement->fetch()) {
//            $jsonArray[] = (array) json_encode($row, JSON_PRETTY_PRINT);
//           // $i++;
//        }
//        var_dump($jsonArray);
//        echo '</br>';
//       // var_dump($jsonArray['Comments'][0]);
//        //var_dump($jsonArray[2]);
//        //return $dataSet;
//    }

    public function getReviews($id, $start, $limit){
        $sqlQuery = "SELECT * FROM Reviews WHERE idBook = ? LIMIT $start, $limit";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->bindParam(1, $id, PDO::PARAM_INT);
        $statement->execute();
        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet[] = new ReviewData($row);
        }
        return $dataSet;
    }


    /**
     * The is invoked when a book object is clicked and it returns an array of ReviewsDataSet objects
     * for a particular passed parameter, which is an integer.
     * @param $id
     * @return array
     */
    public function getComments($id){

        $sqlQuery = "SELECT * FROM Reviews WHERE idBook = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->bindParam(1, $id, PDO::PARAM_INT);
        $statement->execute();

        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet[] = new ReviewData($row);
        }
       // echo '</br></br></br></br></br></br></br>';
       // var_dump($dataSet[0]);



        // works
//        echo '</br>';
//        $var = array_map('utf8_encode', (array)$dataSet[0]); // convert object to array
//        $json =  str_replace('\\u0000*\\u0000', "", json_encode($var));
//        echo '</br>';
//        var_dump($json);
//        echo '</br>';
//        $decode = (array) json_decode($json,true);
//        var_dump(array_values($decode)[2]);
//       // echo $decode['_emailUser'];
        return $dataSet;

    }

    public function getCommentsLoaded($id){

        $sqlQuery = "SELECT * FROM Reviews WHERE idBook = ? LIMIT 1, 5";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->bindParam(1, $id, PDO::PARAM_INT);
        $statement->execute();

        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet[] = new ReviewData($row);
        }
        // echo '</br></br></br></br></br></br></br>';
        // var_dump($dataSet[0]);



        // works
//        echo '</br>';
//        $var = array_map('utf8_encode', (array)$dataSet[0]); // convert object to array
//        $json =  str_replace('\\u0000*\\u0000', "", json_encode($var));
//        echo '</br>';
//        var_dump($json);
//        echo '</br>';
//        $decode = (array) json_decode($json,true);
//        var_dump(array_values($decode)[2]);
//       // echo $decode['_emailUser'];
        return $dataSet;

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