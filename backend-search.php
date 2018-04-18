<?php
require ('Models/BookDataSet.php');
require ('Models/OutputInterface.php');
require ('Models/SerializedArrayOutput.php');
require ('Models/JsonStringOutput.php');
require ('Models/ArrayOutput.php');

$bookDataSet = new BooksDataSet();

$searchFor = $_GET['searchFor'] . '%';
$books = $bookDataSet->searchingFor($searchFor);

if(empty($books)){
    echo 'No results found!';
} else {
    $bookDataSet->setOutput(new JsonStringOutput());
    echo $reviewsJson = $bookDataSet->loadOutput($books);
}