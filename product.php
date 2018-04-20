<?php
require ('Models/UserDataSet.php');
require ('Models/BookDataSet.php');
require ('Models/BasketDataSet.php');
require ('Models/ReviewDataSet.php');
require ('Models/OutputInterface.php');
require ('Models/SerializedArrayOutput.php');
require ('Models/JsonStringOutput.php');
require ('Models/ArrayOutput.php');

session_start();
$view = new stdClass();

$userDataSet = new UserDataSet();
$bookDataSet = new BooksDataSet();
$basketDataSet = new BasketDataSet();
$reviewDataSet = new ReviewDataSet();

// review was submitted
if(isset($_POST['message'])){

    if(!(isset($_SESSION['userEmail']))) {
        echo '"You need to log in first';           // check if the user is logged in first.
    }else {
        // comment is addressed
        $test = json_decode($_POST['message']);
        $reviewDataSet->insertComment($test->bookId, $test->message);   // store review
    }
} else if(!(empty($_POST['load']))) {               // loads comments
    // receives input
    $test = json_decode($_POST['load']);

    // looks for specific entries in the database
    $start = $test->start;
    $end = $test->end;
    $bookId = $test->bookId;
    $rev = $reviewDataSet->getReviews($bookId, $start, $end);

    // returns json format by following the Pattern Strategy
    $reviewDataSet->setOutput(new JsonStringOutput());
    if(empty($rev)){
        echo 'No more reviews! Feel free to share one';
    } else {
        $reviewsJson = $reviewDataSet->loadOutput($rev);
    }

}
else {
    if(isset($_GET['id'])){
        $view->product = $bookDataSet->fetchBook($_GET['id']);
        $view->review = $reviewDataSet->getComments($_GET['id']);

    }
        require ('Views/product.phtml');
}
