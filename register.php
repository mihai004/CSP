<?php require('Models/UserDataSet.php');

session_start();
$view = new stdClass();
$view->pageTitle = 'LogIn/Register';
$userDataSet = new UserDataSet();

if(isset($_SESSION['userID'])) {
    header('Location: index.php');
}

//  register and logIn form
if( isset($_POST['emailReg']) and !empty($_POST['emailReg']) ){
    if(empty($_POST))
    if($userDataSet->registerUser($_POST)===true){
        echo 'Welcome' . $_POST['emailReg'];
    }
} else{
    require ('Views/account.phtml');
}
