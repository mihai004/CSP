<?php require ('Models/BasketDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'Cart';

$basket = new BasketDataSet();

if(!isset($_SESSION['userID'])){
    echo json_encode("No user");
}

// the user is logged in, thereby one can add items to the basket
if (isset($_SESSION['userID']) and (isset($_POST['addMoreProductID']))) {
        $basket->addToCartMore($_POST);
}

// the user is logged in, thereby one can add items to the basket
if (isset($_SESSION['userID']) and (isset($_POST['addForProductID']))) {

        $basket->addToCart($_POST);
}

// the user is logged in, thereby one can remove items from the basket
if (isset($_SESSION['userID']) and (isset($_POST['removeFromCart']))) {

        $basket->removeItems($_POST);
}

// the user is logged in, thereby one can remove an item at a time from the basket
if (isset($_SESSION['userID']) and (isset($_POST['removeForProductID']))) {
        $basket->removeItem($_POST);
}

