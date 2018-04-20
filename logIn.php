<?php require('Models/UserDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'LogIn/Register';          // the title page
$userDataSet = new UserDataSet();

// if the user is logged in then the user cannot access this page by url until the user logs out
if(isset($_SESSION['userID'])) {
    header('Location: index.php');
}

// one tries to logIn
if(isset($_POST['logInCredentials'])){
    if($userDataSet->logIn($_POST)) {
        echo json_encode('Welcome');    // welcome user (error message post by ajaxj responseText if
    }                                         // if no user found.
} else {
    require('Views/account.phtml');
}