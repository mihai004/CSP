<?php
require('Models/UserDataSet.php');
require('Models/BookDataSet.php');
require('Models/BasketDataSet.php');
require ('Models/OutputInterface.php');
require ('Models/SerializedArrayOutput.php');
require ('Models/JsonStringOutput.php');
require ('Models/ArrayOutput.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'Books';                 // the title of the page

$booksDataSet = new BooksDataSet();
$basketDataSet = new BasketDataSet();
$userDataSet = new UserDataSet();

$total = $booksDataSet->countItems();       // returns the number of products with nr in stock > 0
$limit = 0;
$start = 0;

if(isset($_GET['limit'])) {     // get the limit of products per page
    $limit = $_GET['limit'];
}
else {
    $limit = 8;     // by default the number of items per page is 8
                    // user can change this value to a smaller number on the Shop page
}

// displays products with the use of the page number.
if(isset($_GET['page'])) {

    $page = $_GET['page'];
    $start = ($page > 1) ? ($page * $limit) - $limit: 0;

}

// brings all products to be displayed
if (empty($view->booksDataSet)) {

    $view->booksDataSet = $booksDataSet->fetchAllBooks($start, $limit);

}

// looks for user
if(isset($_SESSION['userID'])) {

    $view->user = $userDataSet->searchUser($_SESSION['userID']);

}

// the sort event
if(isset($_GET['sort'])){
    $obj = json_decode($_GET['sort']);
    $arr = $booksDataSet->searchBy($obj->category, $obj->nrInStock, $obj->price);
    $booksDataSet->setOutput(new JsonStringOutput());
    if(empty($arr)){
        echo 'No results found';
    } else {
        echo $reviewsJson = $booksDataSet->loadOutput($arr);
    }
} else {
    require('Views/shopList.phtml');
}