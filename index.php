<?php require('Models/UserDataSet.php');
//phpinfo();
session_start();

$view = new stdClass();
$view->pageTitle = 'Homepage';


$userDataSet = new UserDataSet();
if(isset($_SESSION['userID'])) {

    $view->user = $userDataSet->searchUser('idUser', $_SESSION['userID']);

}

require('Views/index.phtml');
