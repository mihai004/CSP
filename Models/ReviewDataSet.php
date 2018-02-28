<?php
require_once ('Database.php');
require_once('ReviewData.php');
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
     *  The method is invoked in order to add reviews to the books individually.
     */
    public function insertComment() {

        $comment = $this->test_input($_POST['message']);
        if(empty($comment) || $comment = null){
            echo 'You need to type a message, before submitting it';
        }
        else
        {
            $email = $_SESSION['userEmail'];
            $book = $_SESSION['book'];
            $idBook = $book->getIdBook();
            $sqlQuery = "INSERT INTO Reviews (idBook, emailUser, dateTime, comments)
                     VALUES ('$idBook','$email', current_date, '$comment')";
            $statement = $this->_dbHandle->prepare($sqlQuery);
            if($statement->execute() == true)
            {
                echo '<script>alert("Submit")</script>';
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

    /**
     * The is invoked when a book object is clicked and it returns an array of ReviewsDataSet objects
     * for a particular passed parameter, which is an integer.
     * @param $id
     * @return array
     */
    public function getComments($id){

        $sqlQuery = "SELECT * FROM Reviews WHERE idBook = '$id'";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->execute();

        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet[] = new ReviewData($row);
        }

        return $dataSet;

    }

}