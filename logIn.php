<?php require('Models/UserDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'LogIn/Register';


if(isset($_POST['logIn'])) {
    $userDataSet = new UserDataSet();
    $userDataSet->logIn($_POST);
    if(isset($_SESSION['userID'])) {

        header('Location: index.php');

    }
}

require('Views/account.phtml');
