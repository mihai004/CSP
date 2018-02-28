<?php require('Models/UserDataSet.php');

$userDataSet = new UserDataSet();

if (isset($_POST['resetBtn']) && isset($_POST['emailReset'])) {

    $userToBeFound = $_POST['emailReset'];

    $userFound = $userDataSet->searchUser('eMail', $userToBeFound);

    $code = $userFound->getConfirmCode();

    $message = "
            Reset your Password
            Click the link below
            http://eqp326.edu.csesalford.com/resetPassword.php?eMail=$userToBeFound&code=$code
            ";  // the code is needed as a security measure
    mail($userToBeFound, 'Reset Password', $message);

}

else if(isset($_GET['eMail']) && isset($_GET['code'])){

    $_eMail = $_GET['eMail'];
    $_codeConfirmed = $_GET['code'];

    if($userDataSet->checkConfirmation($_eMail, $_codeConfirmed)){
        include ('Views/resetPassword.phtml');
    }

}

else if(isset($_POST['resetPasswdBtn'])){

    $eMail = $userDataSet->test_input($_POST['eMailReset']);
    $password = $userDataSet->test_input(($_POST['passwd']));
    $checkPassword = $userDataSet->test_input($_POST['checkPassword']);
    if($password == $checkPassword){

        $salt = "alabalaportocala";
        $checkPassword = $checkPassword . $salt ;
        $passwordHash = password_hash($checkPassword, PASSWORD_BCRYPT);
        $userDataSet->updateUser('password', $passwordHash, $eMail);
        header('Location: index.php');
    }
    else {

        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    Password do not match. Please try again!
            </br></p>';
    }
}
