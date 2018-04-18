<?php require ('Models/BasketDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'Cart';

$basket = new BasketDataSet();

if(!isset($_SESSION['userID'])){
    echo 'No user found! Make sure you are logged in!';
}

// the user is logged in, thereby one can add items to the basket
if (isset($_SESSION['userID']) and (isset($_POST['addForProductID']))) {

        if($basket->addToCart($_POST) === true){
            //echo 'You item was successfully added to your basket';
        } else {
            //echo 'Your item could not be added to your basket';
        }
}

// the user is logged in, thereby one can remove items from the basket
if (isset($_SESSION['userID']) and (isset($_POST['removeFromCart']))) {

        $basket->removeItems($_POST);
}

// the user is logged in, thereby one can remove an item at a time from the basket
if (isset($_SESSION['userID']) and (isset($_POST['removeForProductID']))) {
        $basket->removeItem($_POST);
}

// the user is logged in, thereby one can clear the items from the basket
if (isset($_SESSION['userID']) and (isset($_POST['clearCart']))) {

        $basket->clearCart();

}
