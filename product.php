<?php
require ('Models/UserDataSet.php');
require ('Models/BookDataSet.php');
require ('Models/BasketDataSet.php');
require ('Models/ReviewDataSet.php');

//session_start();
$view = new stdClass();

$userDataSet = new UserDataSet();
$bookDataSet = new BooksDataSet();
$basketDataSet = new BasketDataSet();
$reviewDataSet = new ReviewDataSet();

// user signed in

if(isset($_SESSION['userEmail'])) {

    $view->user = $userDataSet->searchUser($_SESSION['userID']);

}

// update views for users and visitors

if(isset($_GET['id'])) {
    $view->product = $bookDataSet->fetchBook($_GET['id']);
//    $view->product = $bookDataSet->searchForBook('idBook', $_GET['id']);
    $_SESSION['book'] = $view->product;
    $viewChange = $view->product->getViews()+1;
    $view->pageTitle = $view->product->getBookName(); // adds bookName to the page title

//    $bookDataSet->updateProduct('views', $viewChange, $_GET['id']);
//    what about views?
    $view->review = $reviewDataSet->getComments($_GET['id']);
}


if(isset($_POST['addMoreItems'])){

    $book = $bookDataSet->fetchBook($_POST['productID']);
//    $book = $bookDataSet->searchForBook('idBook', $_POST['productID']);
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
$b = new BooksDataSet();
$x = $bookDataSet->fetchBooks();
//$q = null;
if(isset($_POST['q'])){
    echo $_POST['q'];
}

$q=null;
if(isset($_REQUEST['q'])){
    $q = $_REQUEST['q'];
}

if(($q===null || empty($q)) || !(isset($_POST['message']))){
    require ('Views/product.phtml');
}
else {

    $x = $bookDataSet->fetchBooks();
//    var_dump($x);
    $q = $_REQUEST["q"];

    $hint="";
    if($q !== ''){
        $q = strtolower($q);
        $len = strlen($q);
        $arr=null;
        $i=0;
        foreach ($x as $name) {
            if(stristr($q, substr($name->getBookName(), 0, $len))){
                if($hint === ""){
                    $arr[$i++] = $name->getBookName();
                } else {
                    $arr[$i++] = $name->getBookName();
                }
            }
            if(stristr($q, substr($name->getAuthor(), 0, $len))){
                if($hint === ""){
                    $arr[$i++] = $name->getAuthor();
                } else {
                    $arr[$i++] = $name->getAuthor();
                }
            }
        }
        if(empty($arr)) {
            echo 'No results found';
        } else {
            echo '<ul class="list-group pre-scrollable">';
            for($i=0; $i<sizeof($arr); $i++){
                echo '<option class="list-group-item" value="'.$arr[$i].'" onclick="getBook(this.value)">' . $arr[$i] . '</option>';
            }
            echo '</ul>';
        }
    }
}

// the new submit
if(isset($_POST['message'])){
    if(!(isset($_SESSION['userEmail']))) {
        echo '<p class="text-center alert-danger">"You need to log in first"</p>';
    }else {
        // comment is addressed
        $reviewDataSet->insertComment($_POST);
    }
}