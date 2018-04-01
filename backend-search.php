<?php require ('Models/BookDataSet.php');
require ('Models/OutputInterface.php');
require ('Models/SerializedArrayOutput.php');
require ('Models/JsonStringOutput.php');
require ('Models/ArrayOutput.php');

$bookDataSet = new BooksDataSet();
$books = $bookDataSet->fetchBooks();

$searchFor = $_GET['searchFor'];


$hint="";
if($searchFor !== ''){
    $searchFor = strtolower($searchFor);
    $len = strlen($searchFor);
    $arr=null;
    $i=0;
    foreach ($books as $name) {
        if(stristr($searchFor, substr($name->getBookName(), 0, $len))){
            if($hint === ""){
                $arr[$i++] = $name;
            } else {
                $arr[$i++] = $name;
            }
        }
        if(stristr($searchFor, substr($name->getAuthor(), 0, $len))){
            if($hint === ""){
                $arr[$i++] = $name;
            } else {
                $arr[$i++] = $name;
            }
        }
    }
    $bookDataSet->setOutput(new JsonStringOutput());
    if(empty($arr)){
        echo 'No results found';
    } else {
        echo $reviewsJson = $bookDataSet->loadOutput($arr);
    }

//
//    if(empty($arr)) {
//            echo 'No results found';
//    } else {
//      //  echo '<ul class="list-group pre-scrollable">';
//            for($i=0; $i<sizeof($arr); $i++){
//      //          echo '<option class="list-group-item" value="'.$arr[$i].'" onclick="getBook(this.value)">' . $arr[$i] . '</option>';
//            }
//      //  echo '</ul>';
//    }
}
