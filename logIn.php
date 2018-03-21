<?php require('Models/UserDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'LogIn/Register';
$userDataSet = new UserDataSet();

if(isset($_SESSION['userID'])) {
    header('Location: index.php');
}

//  logIn form
if(isset($_POST['emailLogIn']) && isset($_POST['passwordLogIn'])) {
    if (!empty($_POST['emailLogIn']) && isset($_POST['passwordLogIn'])) {
        if($userDataSet->logIn($_POST)){
            echo 'Welcome ' . $_POST['emailLogIn'] . '!.';
        }
    }
} else {
    require ('Views/account.phtml');
}