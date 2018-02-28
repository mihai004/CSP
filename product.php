<?php
require ('Models/UserDataSet.php');
require('Models/BookDataSet.php');
require ('Models/BasketDataSet.php');
require('Models/ReviewDataSet.php');

session_start();
$view = new stdClass();

$userDataSet = new UserDataSet();
$bookDataSet = new BooksDataSet();
$basketDataSet = new BasketDataSet();
$reviewDataSet = new ReviewDataSet();

// user signed in

if(isset($_SESSION['userEmail'])) {

    $view->user = $userDataSet->searchUser('idUser', $_SESSION['userID']);

}

// update views for users and visitors

if(isset($_GET['id'])) {

    $view->product = $bookDataSet->searchForBook('idBook', $_GET['id']);
    $_SESSION['book'] = $view->product;
    $viewChange = $view->product->getViews()+1;
    $view->pageTitle = $view->product->getBookName(); // adds bookName to the page title

    $bookDataSet->updateProduct('views', $viewChange, $_GET['id']);

}


if(isset($_POST['submitCom'])) {

        // the user needs to be logged in to comment
    if(!(isset($_SESSION['userEmail']))) {
        echo '<p class="text-center alert-danger">"You need to log in first"</p>';
    }else {
        // comment is addressed
        $reviewDataSet->insertComment();
    }
}

// brings the comments for each book item
    $view->review = $reviewDataSet->getComments($_GET['id']);

//  adding more items

if(isset($_POST['addMoreItems'])){

    $book = $bookDataSet->searchForBook('idBook', $_POST['productID']);
    $inStock = $book->getNumberInStock();
    $quantityTobeAdded = $_POST['quantityPerItem'];

    if($_POST['quantityPerItem'] >  $inStock)
    {

        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    At the moment, we only have ' . $inStock . ' copies in stock.
            </br></p>';

    } else {
        echo '
        <script>
        $(document).ready(function() {
          $("#response").html("The Book was successfully added");
          setTimeout(function(){
                $("#response").html(" ");
            }, 2000);
        });
        </script>
        
        ';

        $basketDataSet->addToCart($_POST);
        $basketDataSet->updateQuantity($_SESSION['userID'], $_POST['productID'], $_POST['quantityPerItem'] - 1);

    }

}

require ('Views/product.phtml');