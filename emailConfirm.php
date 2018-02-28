<?php require('Models/UserDataSet.php');

$userDataSet = new UserDataSet();
if(isset($_GET['eMail']) && isset($_GET['code'])) {
    $_eMail = $_GET['eMail'];
    $_code = $_GET['code'];

    $userDataSet->checkConfirmation($_eMail, $_code);
}
else {
    echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-info text-center text-info">
                    Please confirm your e-mail in order to log in.
            </br></p>';
}