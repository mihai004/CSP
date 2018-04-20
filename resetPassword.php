<?php require('Models/UserDataSet.php');

$userDataSet = new UserDataSet();

// a user wants to reset the password for the account
if (isset($_POST['resetBtn']) && isset($_POST['emailReset'])) {

    $userToBeFound = $_POST['emailReset'];
    $userFound = $userDataSet->searchUser('eMail', $userToBeFound);   // user exists
    $code = $userFound->getConfirmCode();                                   // random number selected for security reasons
    $message = "                                                            
            Reset your Password
            Click the link below
            http://eqp326.edu.csesalford.com/resetPassword.php?eMail=$userToBeFound&code=$code
            ";  // the code is needed as a security measure
    mail($userToBeFound, 'Reset Password', $message);

}

// confirms the user identity after an email check
else if(isset($_GET['eMail']) && isset($_GET['code'])){

    $_eMail = $_GET['eMail'];
    $_codeConfirmed = $_GET['code'];

    if($userDataSet->checkConfirmation($_eMail, $_codeConfirmed)){
        include ('Views/resetPassword.phtml');
    }

}

// resets the password
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
        echo 'Password do not match. Please try again!';
    }
}
