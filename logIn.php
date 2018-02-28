<?php require('Models/UserDataSet.php');

session_start();

$view = new stdClass();
$view->pageTitle = 'LogIn/Register';

if(isset($_SESSION['userID'])) {

    header('Location: index.php');

}

if(isset($_POST['logIn'])) {

    $userDataSet = new UserDataSet();
    $user = $userDataSet->test_input($_POST["email"]);
    $view->user = $userDataSet->searchUser('eMail', $user); // get the person obj
    if($view->user) // if the user exists
    {
        $password = $userDataSet->test_input($_POST["passwordLogin"]);
        $salt = "alabalaportocala";
        if(password_verify($password . $salt, $view->user->getPassword()))
        {

            if($view->user->getConfirmed()) {

                $_SESSION['userID'] = $view->user->getIdUser();
                $_SESSION['userEmail'] = $view->user->getEMail(); // getting the eMail
                header('Location: shopList.php');

            }
            else {

                echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-info text-center text-info">
                    Please confirm your e-mail in order to log in.
            </br></p>';

            }

        }
        else {

            echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    Password do not match. Please try again!
            </br></p>';

        }
    }
    else {

        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    E-mail not found. Please try again!
            </br></p>';

    }
}

require('Views/account.phtml');
