<?php require('Models/UserDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'LogIn/Register';
echo $_POST['emailLogIn'];
echo $_POST['emailLogIn'];
var_dump($_POST);
//if(isset($_POST['eMail_LogIn'])){
//    echo 'hi';
//    var_dump($_POST);
//}

//$errorMSG = "";
//
//if(empty($_POST['eMail_LogIn'])){
//    $errorMSG = "<li>E-mail is required!</li>";
//}
//else if(empty($_POST['passowrd_LogIn'])){
//    $errorMSG = "<li>No password typed!</li>";
//} else {
//    $userDataSet = new UserDataSet();
//    var_dump($_POST);
//    //$userDataSet->logIn($_POST);
//}


//if(isset($_POST['logIn'])) {
//    $userDataSet = new UserDataSet();
//    $userDataSet->logIn($_POST);
//    $userDataSet->searchUser('eMail', $_POST['email']);
//    $userDataSet->logIn($_POST);
//    if(isset($_SESSION['userID'])) {
//
//        header('Location: index.php');
//
//    }
//}

//require('Views/account.phtml');
