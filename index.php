<?php require('Models/UserDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'Homepage';          // page title

$userDataSet = new UserDataSet();

// get user details for display
if(isset($_SESSION['userID'])) {
    $view->user = $userDataSet->searchUser($_SESSION['userID']);
}

require('Views/index.phtml');
