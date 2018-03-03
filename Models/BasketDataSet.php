<?php
require_once ('Database.php');
require('BasketData.php');
session_start();

class BasketDataSet
{
    protected $_dbHandle, $_dbInstance;

    public function __construct()
    {
        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
    }

    /**
     * The method returns the products of a particular user.
     * @param $id
     * @return array
     */
    public function fetchAllBasket($id, $start, $limit)
    {
        $sqlQuery = "SELECT * FROM Basket WHERE idUser ='$id' limit $start, $limit";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement

        $basket = [];
        while ($row = $statement->fetch()) {
            $basket[] = new BasketData($row);
        }
        return $basket;

    }


//    public function fetchAllBasket($id)
//    {
//
//        $sqlQuery = "SELECT * FROM Basket WHERE idUser ='$id'";
//        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
//        $statement->execute(); // execute the PDO statement
//
//        $basket = [];
//        while ($row = $statement->fetch()) {
//            $basket[] = new BasketData($row);
//        }
//        return $basket;
//
//    }

    /**
     * The method checks for duplicate items in the basket.
     * @param $userID
     * @param $productID
     * @return bool
     */
    public function checkDuplicates($userID,$productID){

        $sqlQuery = "SELECT * FROM Basket WHERE idUser ='$userID' AND idBook = '$productID'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
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

        $sqlQuery = "SELECT * FROM Basket WHERE idUser ='$userID' AND idBook = '$bookID'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement

        $row = $statement->fetch();
        $basket = new BasketData($row);

        return $basket; // returns the basket Object

    }

    /**
     * The method updates the quantity according to the method in which it is invoked.
     * @param $userID
     * @param $bookID
     * @return bool
     */
    public function updateQuantity($userID, $bookID, $quantity){

        $basket = $this->findBasketID($userID, $bookID);
        $id = $basket->getIdBasket();

        $newQuantity = $basket->getQuantity() + $quantity;

        $sqlQuery = "UPDATE Basket SET quantity = '$newQuantity'  WHERE idBasket = '$id'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement
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


    /**
     * The method adds products to the chart one by one.
     * @param $post
     */
    public function addToCart($post)
    {
        $user = $_SESSION['userID'];
        $product = $post['productID'];
        if ($this->checkDuplicates($user, $product) == true) {
            $this->updateQuantity($user, $product, 1);
        } else {
            $sqlQuery = "INSERT INTO Basket (idUser, idBook, quantity) VALUES('$user','$product', '1')";
            if ($this->_dbHandle->exec($sqlQuery)) {
              //  echo "successful";
                echo '<div id="response" style="font-size: 20px; margin-bottom: 15px;"  class="bg-success text-center text-success">
                        Successfully added
                       </div>';
            } else {
               // echo "failed";
            }
        }
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
        $sqlQuery = "SELECT quantity FROM Basket WHERE idBasket ='$basketID'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            return $row['quantity'];
        }
    }


    /**
     * The method removes one item at a time.
     * @param $post
     * @return bool
     */
    public function removeItem($post)
    {
        $user = $_SESSION['userID'];
        $itemID = $post['productID'];
        $basket = $this->findBasketID($user, $itemID);
        $basketID = $basket->getIdBasket();

        $newQuantity = $this->findQuantity($basketID);

        if($newQuantity > 1) {
            $this->updateQuantity($user, $itemID, - 1);
        }
        else {
            $sqlQuery = "DELETE FROM Basket WHERE idUser = '$user' AND idBook = '$itemID'";
            $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
            $statement->execute(); // execute the PDO statement
        }
    }

    /**
     * The method removes one item along with all its copies.
     * @param $post
     */
    public function removeItems($post)
    {
        $itemID = $post['productID'];

        $sqlQuery = "DELETE FROM Basket WHERE idBasket = '$itemID'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement

    }

    /**
     * The method clears the cart.
     * @return PDO
     */
    public function clearCart()
    {
        $userID = $_SESSION['userID'];
        $sqlQuery = "DELETE FROM Basket WHERE idUser = '$userID'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement
    }


}