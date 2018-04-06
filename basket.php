<?php
ini_set('display_errors', 1);       // finding errors
require('Models/UserDataSet.php');
require('Models/BookDataSet.php');
require('Models/BasketDataSet.php');
//require_once (__DIR__ . 'vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();

$view = new stdClass();
$view->pageTitle = 'Books';


$userDataSet = new UserDataSet();
$basketDataSet = new BasketDataSet();
$booksDataSet = new BooksDataSet();
//
if(!(isset($_SESSION['userID']))) {

   header('Location: index.php');

}

if(isset($_SESSION['userID'])){

    $view->user = $userDataSet->searchUser( $_SESSION['userID']);
    $view->booksDataSet = new BooksDataSet();
    $view->basketDataSet = new BasketDataSet();

    if(isset($_GET['page'])) {
        $page = $_GET['page'];
    } else {
        $page = 1;
    }
    $limit = 5;
    $start = ($page > 1) ? ($page * $limit) - $limit: 0;
    $view->basket = $basketDataSet->fetchBasketPerPage($_SESSION['userID'], $start, $limit);
    $view->noOfBooks = $basketDataSet->selectUniqueBooks();

    //$view->basket = $basketDataSet->fetchAllBasket($_SESSION['userID']);

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
    if($countItems === count($basket))    // if there all enough copies for each item, the customer
    {                                    // would proceed, otherwise a message would be displayed

        $arrayOfBooks = [];
        foreach ($basket as $item) {
            $book = $booksDataSet->fetchBook($item->getBookID());
            $newQuantity = $book->getNumberInStock() - $item->getQuantity();
            $booksDataSet->updateProduct($newQuantity, $book->getIdBook());
            $arrayOfBooks[] = $book->getBookName();
        }

        $eMail = $_SESSION['userEmail'];
        $basketDataSet->clearCart();
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        try {
            //Server settings
            // $mail->SMTPDebug = 2;                               // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'bmihairaul@gmail.com';             // SMTP username
            $mail->Password = 'Em4l4aromagnamami';                // SMTP password
            $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 465;                                    // TCP port to connect to

            //Recipients
            $mail->setFrom('bmihairaul@gmail.com', 'MyBooks@library.com');
            $mail->addAddress($eMail);                 // Add a recipient. Name is optional
            $mail->addReplyTo('info@example.com', 'Information');

            $message = "
              Your order is on the way.
              Thank you for shopping with us.
              You order with the products "
                . implode(', ', $arrayOfBooks) . "
              is on the way to you.
              Best regards
              MyBooks Team.
            ";

            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Your order';
            $mail->Body    = $message;

            $mail->send();

            $basketDataSet->clearCart();
            echo '<script>window.location.replace("basket.php?thankYou")</script>';
            // a message is displayed to inform the user that the checkOut process was successful.
        }
        catch (Exception $e) {
                echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    }
    else {
        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    Not enough copies unfortunately for your order at the moment.
            </br></p>';
    }

}
require('Views/basket.phtml');
