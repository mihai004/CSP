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


//if(!(isset($_POST['emailLogIn'])) || empty($_POST['emailLogIn'])){
//    require_once ('Views/account.phtml');
//} else {
//    echo $_POST['emailLogIn'];
//}
//} else {
//var_dump($_POST['emailLogIn']);
//echo 'Viorel';
//}


//}

//if(isset($_SESSION['userID'])) {
//    header('Location: index.php');
//}
//
//if(isset($_POST['emailLogIn']) && isset($_POST['passwordLogIn'])){
//    $userDataSet = new UserDataSet();
//    $userDataSet->logIn($_POST);
//    $data = "testUser";
//} else {
//    require_once('Views/account.phtml');
//}
//
//if (isset($_POST['emailReg'])) {
//    $userDataSet = new UserDataSet();
//    $userDataSet->insertUser();
//} else {
//    require_once('Views/account.phtml');
//}


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