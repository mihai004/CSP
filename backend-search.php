<?php
require ('Models/BookDataSet.php');
require ('Models/OutputInterface.php');
require ('Models/SerializedArrayOutput.php');
require ('Models/JsonStringOutput.php');
require ('Models/ArrayOutput.php');

$bookDataSet = new BooksDataSet();

$searchFor = $_GET['searchFor'] . '%';                   // search by using the LIKE operator for database
$books = $bookDataSet->searchingFor($searchFor);         // more efficient in terms of data returned than a full text search.

if(empty($books)){
    echo 'No results found!';
} else {                                                 // the Strategy Pattern separates the strategy of
    $bookDataSet->setOutput(new JsonStringOutput());     // organizing data from the client. Data is returned
    echo $reviewsJson = $bookDataSet->loadOutput($books); // basted on the ouput selected (eg. JSON, XML, Array Serializable)
}