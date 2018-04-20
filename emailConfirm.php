<?php require('Models/UserDataSet.php');

$userDataSet = new UserDataSet();
// confirm user identity once email sent by the server was clicked by the user.
if(isset($_GET['eMail']) && isset($_GET['code'])) {
    $_eMail = $_GET['eMail'];
    $_code = $_GET['code'];
    $userDataSet->checkUserIdentity($_eMail, $_code);       // confirm user in the database.
}
else {
    echo 'Please confirm your e-mail in order to log in.';  // identity not confirmed for the registered email.
}