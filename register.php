<?php require('Models/UserDataSet.php');
session_start();
$view = new stdClass();
$view->pageTitle = 'LogIn/Register';
if(isset($_SESSION['userID'])) {
    header('Location: index.php');
}
if (isset($_POST['emailReg'])) {
    $userDataSet = new UserDataSet();
    $userDataSet->insertUser();
} else {
    require_once('Views/account.phtml');
}


//if($_POST['user_email']){
//    echo $_POST['user_email'] . "pllllllll";
//}
//
//if (isset($_POST['register'])) {
//
////
////    $userDataSet = new UserDataSet();
////    $userDataSet->insertUser();
////
//}
//require_once('Views/account.phtml');