<?php
require_once ('Database.php');
require('BasketData.php');
//// JSON
//require ('OutputInterface.php');
//require ('SerializedArrayOutput.php');
//require ('JsonStringOutput.php');
//require ('ArrayOutput.php');


class BasketDataSet
{
    protected $_dbHandle, $_dbInstance;

    public function __construct()
    {
        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
    }

    /**
     * @param $id
     * @param $start
     * @param $limit
     * @return array
     */
    public function fetchBasketPerPage($id, $start, $limit)
    {
        $sqlQuery = "SELECT * FROM Basket WHERE idUser = ? LIMIT ?, ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$id);
        $statement->bindValue(2, $start, PDO::PARAM_INT);
        $statement->bindValue(3, $limit, PDO::PARAM_INT);
        $statement->execute(); // execute the PDO statement

        $basket = [];
        while ($row = $statement->fetch()) {
            $basket[] = new BasketData($row);
        }
        return $basket;

    }


    public function fetchAllBasket($id)
    {

        $sqlQuery = "SELECT * FROM Basket WHERE idUser = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindValue(1, $id, PDO::PARAM_INT);
        $statement->execute(); // execute the PDO statement
        $basket = [];
//        $json = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
           // var_dump(json_encode($row));
//            $json['Basket'][] = $row;
            $basket[] = new BasketData($row);
        }
//        echo $newJson = json_encode($json, JSON_PRETTY_PRINT);
//        $decode = json_decode($newJson, true);
//        echo $decode['Basket'][1]['idBasket'];
//        foreach ($obj as $newJson){
//            $obj->idBasket;
//        }
//        return $decode['Basket'][1]['idBasket'];
        return $basket;
    }

    /**
     * The method checks for duplicate items in the basket.
     * @param $userID
     * @param $productID
     * @return bool
     */
    public function checkDuplicates($userID,$productID)
    {

        $sqlQuery = "SELECT * FROM Basket WHERE idUser = ? AND idBook = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$userID);
        $statement->bindParam(2,$productID);
        $statement->execute(); // execute the PDO statement

        if($statement->rowCount() > 0){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * The method find the id of a basket due to the safeMode of MySql Database.
     * @param $userID
     * @param $bookID
     * @return BasketData
     */
    public function findBasketID($userID, $bookID)
    {

        $sqlQuery = "SELECT * FROM Basket WHERE idUser = ? AND idBook = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindValue(1,$userID);
        $statement->bindValue(2,$bookID);
        $statement->execute(); // execute the PDO statement
        $row = $statement->fetch();
        $basket = new BasketData($row);

        return $basket; // returns the basket Object

    }

    /**
     * @param $userID
     * @param $bookID
     * @param $quantity
     * @return bool
     */
    public function updateQuantity($userID, $bookID, $quantity){

        $basket = $this->findBasketID($userID, $bookID);
        $id = $basket->getIdBasket();

        $newQuantity = $basket->getQuantity() + $quantity;

        $sqlQuery = "UPDATE Basket SET quantity = ?  WHERE idBasket = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindValue(1, $newQuantity);
        $statement->bindParam(2, $id);
        if($statement->execute())
        {
            echo $newQuantity;  // the new quantity when plus is clicked for a new book copy
            return true;
        }
        else
        {
            echo "not updated";
            return false;
        }

    }

    public function addToCartMore($post){
        $dbParam = json_decode($post['addMoreProductID']);
        $userID = $_SESSION['userID'];
        $productID = $dbParam->idBook;//$post['addMoreProductID'];
        $quantity = $dbParam->quantity;
        if ($this->checkDuplicates($userID, $productID) === true) {
                $this->updateQuantity($userID, $productID, $quantity);
                return true;
        } else {
        $sqlQuery = "INSERT INTO Basket (idUser, idBook, quantity) VALUES(?, ?, ?)";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$userID);
        $statement->bindParam(2,$productID);
        $statement->bindParam(3, $quantity);
            if ($statement->execute()) {
            return true;
            }
        }
        return false;
    }


    /**
     * @param $post
     * @return bool
     */
    public function addToCart($post)
    {
        $userID = $_SESSION['userID'];
        $productID = $post['addForProductID'];
        $value = 1;
        if ($this->checkDuplicates($userID, $productID) === true) {
            $this->updateQuantity($userID, $productID, 1);
            return true;
        } else {
            $sqlQuery = "INSERT INTO Basket (idUser, idBook, quantity) VALUES(?, ?, ?)";
            $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
            $statement->bindParam(1,$userID);
            $statement->bindParam(2,$productID);
            $statement->bindParam(3, $value);
            if ($statement->execute()) {
//                echo '<div id="response" style="font-size: 20px; margin-bottom: 15px;"  class="bg-success text-center text-success">
//                        Successfully added
//                       </div>';
                return true;
            }
//            else {
//                return false;
//               // echo 'failed';
//            }
        }
        return false;
    }

    /**
     * @return string
     */
    public function userNotLogged(){
        $err = "You need to be logged in, before adding items to the basket";
        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                '. $err .'     
            </br></p>';
       // return $err;
    }


    /**
     * The method returns the quantity for a particular item, based on basket id.
     * @param $basketID
     * @return mixed
     */
    public function findQuantity($basketID){
        $sqlQuery = "SELECT quantity FROM Basket WHERE idBasket = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$basketID);
        $statement->execute(); // execute the PDO statement

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            return $row['quantity'];
        }
    }


    /**
     * The method removes one item at a time.
     * @param $post
     */
    public function removeItem($post)
    {
        $userID = $_SESSION['userID'];
        $itemID = $post['removeForProductID'];
        $basket = $this->findBasketID($userID, $itemID);
        $basketID = $basket->getIdBasket();

        $newQuantity = $this->findQuantity($basketID);

        if($newQuantity > 0) {
            $this->updateQuantity($userID, $itemID, - 1);
        }
        else {
            $sqlQuery = "DELETE FROM Basket WHERE idUser = ? AND idBook = ?";
            $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
            $statement->bindParam(1,$userID);
            $statement->bindParam(2,$itemID);
            $statement->execute(); // execute the PDO statement
        }
    }

    /**
     * The method removes one item along with all its copies.
     * @param $post
     */
    public function removeItems($post)
    {
        $itemID = $post['removeFromCart'];
        $sqlQuery = "DELETE FROM Basket WHERE idBasket = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$itemID);
        $statement->execute(); // execute the PDO statement

    }

    /**
     * The method clears the cart.
     */
    public function clearCart()
    {
        $userID = $_SESSION['userID'];
        $sqlQuery = "DELETE FROM Basket WHERE idUser = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$userID);
        $statement->execute(); // execute the PDO statement
    }

    /**
     * The method counts the number of books left in the basket
     * @return int
     */
    public function selectUniqueBooks(){
        $userID = $_SESSION['userID'];
        $sqlQuery = "SELECT DISTINCT idBook FROM Basket WHERE idUser = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->bindParam(1,$userID);
        $statement->execute(); // execute the PDO statement
        $count = $statement->rowCount();
        return $count;
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