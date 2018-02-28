<?php require('Models/UserDataSet.php');
session_start();

$view = new stdClass();
$view->pageTitle = 'LogIn/Register';

if(isset($_SESSION['userID'])) {

     header('Location: index.php');
}


if (isset($_POST['register'])) {

    $userDataSet = new UserDataSet();
    $userDataSet->insertUser();

}

require('Views/account.phtml');
