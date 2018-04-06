<?php require('Models/UserDataSet.php');

session_start();
$view = new stdClass();
$view->pageTitle = 'LogIn/Register';
$userDataSet = new UserDataSet();

if(isset($_SESSION['userID'])) {
    header('Location: index.php');
}

//  register and logIn form
if( isset($_POST['emailReg']) or !empty($_POST['emailReg']) ){
    if($userDataSet->registerUser($_POST)===true){
        echo 'Welcome' . $_POST['emailReg'];
    } else {
        echo 'not working';
    }
} elseif (!isset($_POST['emailReg']) or $_POST['emailReg'] !== 'Uncompleted field'){
    require ('Views/account.phtml');
}
