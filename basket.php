<?php
ini_set('display_errors', 1);       // finding errors
require('Models/UserDataSet.php');
require('Models/BookDataSet.php');
require('Models/BasketDataSet.php');


$view = new stdClass();
$view->pageTitle = 'Books';


$userDataSet = new UserDataSet();
$basketDataSet = new BasketDataSet();
$booksDataSet = new BooksDataSet();

if(!(isset($_SESSION['userID']))) {

   header('Location: index.php');

}

if(isset($_SESSION['userID'])){

    $view->user = $userDataSet->searchUser('idUser', $_SESSION['userID']);
    $view->booksDataSet = new BooksDataSet();
    $view->basket = $basketDataSet->fetchAllBasket($_SESSION['userID']);

}

if(isset($_POST['checkOut'])){

    $basket = $basketDataSet->fetchAllBasket($_SESSION['userID']);
    $countItems = 0;

    foreach ($basket as $item){ // checks if the selected items are available
        $book = $booksDataSet->fetchBook($item->getBookID());
        if($item->getQuantity() <= $book->getNumberInStock()){
            $countItems += 1;
        }
    }
    if($countItems == count($basket))    // if there all enough copies for each item, the customer
    {                                    // would proceed, otherwise a message would be displayed

        $arrayOfBooks = [];
        foreach ($basket as $item) {
            $book = $booksDataSet->fetchBook($item->getBookID());
            $newQuantity = $book->getNumberInStock() - $item->getQuantity();
            $booksDataSet->updateProduct('numberInStock', $newQuantity, $book->getIdBook());

            $arrayOfBooks[] = $book->getBookName();
            }

            $eMail = $_SESSION['userEmail'];

            $message = "
              Your order is on the way.
              Thank you for shopping with us.
              Have a nice day. "
                . implode(', ', $arrayOfBooks) . "
              Best regards
              MyBooks Team.
            ";

            mail($eMail, 'DoNotReply@myBooks.com', $message, "Hi");

            $basketDataSet->clearCart();
            echo '<script>window.location.replace("basket.php?thankYou")</script>';
            // a message is displayed to inform the user that the checkOut process was successful.
    }
    else {
        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    Not enough copies unfortunately for your order at the moment.
            </br></p>';
    }

}

require('Views/basket.phtml');
