<?php require('Models/UserDataSet.php');

session_start();
$view = new stdClass();
$view->pageTitle = 'LogIn/Register';                       // the title of the page
$userDataSet = new UserDataSet();

// user can not access the logIn or register page once logged in.
if(isset($_SESSION['userID'])) {
    header('Location: index.php');
}

//  register the prospective user
if( isset($_POST['emailReg']) or !empty($_POST['emailReg']) ){
    if($userDataSet->registerUser($_POST)===true){
        echo 'Welcome' . $_POST['emailReg'];               // the registration was successful
    } else {
        echo 'The registration was unsuccessful!';           // the registration was unsuccessful
    }
} elseif (!isset($_POST['emailReg']) or $_POST['emailReg'] !== 'Uncompleted field'){  // all fields completed
    require ('Views/account.phtml');
}
