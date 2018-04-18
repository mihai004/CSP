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
$view->pageTitle = 'Books';

$booksDataSet = new BooksDataSet();
$basketDataSet = new BasketDataSet();
$userDataSet = new UserDataSet();

$total = $booksDataSet->countItems();
$limit = 0;
$start = 0;

if(isset($_GET['limit'])) {

    $limit = $_GET['limit'];

}
else {

    $limit = 8;     // by default the number of items per page is 9
                    // user can change this value to a smaller number
}

if(isset($_GET['page'])) {

    $page = $_GET['page'];
    $start = ($page > 1) ? ($page * $limit) - $limit: 0;

}


if (empty($view->booksDataSet)) {

    $view->booksDataSet = $booksDataSet->fetchAllBooks($start, $limit);

}

//if(isset($_POST['look'])) {
//
//    $view->booksDataSet = $booksDataSet->searchByAttribute($_POST['search']);
//
//}


if(isset($_POST['filter_1']) || isset($_POST['filter_2'])) {
    $total = $booksDataSet->countFilters($_POST['filter_1'], $_POST['filter_2']);
    $view->booksDataSet = $booksDataSet->searchFor($_POST['filter_1'], $_POST['filter_2'], $start, $limit);
}

//if(isset($_POST['filter_1'])){
//    echo $_GET['filter_1'];
//}
//elseif(isset($_POST['sort'])) {
//
//    $total = $booksDataSet->countFilters($_POST['filter_1'], $_POST['filter_2']);
//    $view->booksDataSet = $booksDataSet->searchFor($_POST['filter_1'], $_POST['filter_2'], $start, $limit);
//}
//}


//
//elseif(isset($_GET['sort'])) {
//
//    $total = $booksDataSet->countFilters($_GET['filter_1'], $_GET['filter_2']);
//    $view->booksDataSet = $booksDataSet->searchFor($_GET['filter_1'], $_GET['filter_2'], $start, $limit);
//
////}


if(isset($_SESSION['userID'])) {

    $view->user = $userDataSet->searchUser($_SESSION['userID']);

}

//if (isset($_POST['test'])) {
//    echo $_POST['test'];
//    // $userDataSet->insertUser();
//    } else {
//    require_once('Views/shopList.phtml');
//}

//if(isset($_GET['category'])){
//    echo $_GET['category'];
//    //var_dump($booksDataSet->searchBy($_GET['category']));
//    $arr = $booksDataSet->searchBy($_GET['category']);
//    $bookDataSet->setOutput(new JsonStringOutput());
//    if(empty($arr)){
//        echo 'No results found';
//    } else {
//        echo $reviewsJson = $bookDataSet->loadOutput($arr);
//    }
//
//} else {
//    require('Views/shopList.phtml');
//}


//echo json_decode($_GET['dbParam']);
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