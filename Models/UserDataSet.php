<?php
include ('UserData.php');
require('Database.php');
require_once (__DIR__ . ' /../vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class UserDataSet
{
    protected $_dbHandle, $_dbInstance;

    /**
     * UserDataSet constructor.
     */
    public function __construct() {
        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
    }

    /**
     * The method in called when a user types its e-mail in order to log in.
     * If the user is found, then it may proceed further. Otherwise a message will
     * be displayed.
     * @param $value
     * @return array|UserData
     */
    public function searchUser($value) {
        $sqlQuery = "SELECT * FROM Users WHERE eMail = ?";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->bindParam(1, $value, PDO::PARAM_STR);
        $statement->execute();
        $dataSet = [];
        while($row = $statement->fetch()) {
            $dataSet = new UserData($row);
        }
        return $dataSet;
    }


    /**
     *  The method is invoked when a person wants to register. In this case, all the data that the
     * user types will be tested in a securely manner before adding that persons' details to the database.
     */
     public function insertUser()
    {
            $eMail = $mobileNumber = $houseNumber = $streetName = $city = $country = $postCode = $password = null;

            $eMail = $this->test_input($_POST['emailReg']);
            $mobileNumber = $this->test_input($_POST['mobileNumber']);
            $houseNumber = $this->test_input($_POST['houseNumber']);
            $streetName = $this->test_input($_POST['streetName']);
            $city = $this->test_input($_POST['city']);
            $country = $this->test_input($_POST['country']);
            $regPostcode = "/^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/";
            $postCode = $this->test_input($_POST['postCode']);
            $password = $this->test_input($_POST['password']);
            $passwordConfirm = $this->test_input($_POST['passwordConfirm']);

            if ($this->checkEmail($eMail) == true) {
                echo '<script>alert("We already have your eMail")</script>';
            } else if (!(filter_var($eMail, FILTER_VALIDATE_EMAIL))) {
                echo '<script>alert("Invalid eMail format")</script>';
            } else if ($this->checkPhoneNumber($mobileNumber)) {
                echo '<script>alert("Oops! Someone is already using your mobile ")</script>';
            } else if (!(is_numeric($mobileNumber))) {
                echo '<script>alert("Invalid mobile number format")</script>';
            } else if (!(is_numeric($houseNumber))) {
                echo '<script>alert("Invalid house number format")</script>';
            } else if (!preg_match("/^[a-zA-Z ]*$/", $streetName)) {
                echo '<script>alert("Only letters and white space allowed for Street Name")</script>';
            } else if (!preg_match("/^[a-zA-Z ]*$/", $city)) {
                echo '<script>alert("Only letters and white space allowed for City Name")</script>';
            } else if (!preg_match("/^[a-zA-Z ]*$/", $country)) {
                echo '<script>alert("Only letters and white space allowed for Country Name")</script>';
            } else if (!preg_match($regPostcode, $postCode)) {
                echo '<script>alert("Invalid post code format")</script>';
            } else if ($password != $passwordConfirm) {
                echo '<script>alert("Passwords do not match")</script>';
            } else if(!preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/', $password)) {
                echo '<script>alert("The password should be at least 6 - 32 characters long." +
                    "\\nHaving at least one capital letter and one digit")</script>';
            }
            else {

                $confirmCode = rand(); // check e-mail in database, no duplicates
                $salt = "alabalaportocala";
                $password .= $salt;
                $passwordHash = password_hash($password, PASSWORD_BCRYPT);

                $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
                try {
                    //Server settings
                    // $mail->SMTPDebug = 2;                               // Enable verbose debug output
                    $mail->isSMTP();                                      // Set mailer to use SMTP
                    $mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
                    $mail->SMTPAuth = true;                               // Enable SMTP authentication
                    $mail->Username = 'bmihairaul@gmail.com';             // SMTP username
                    $mail->Password = 'Em4l4aromagnamami';                // SMTP password
                    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
                    $mail->Port = 465;                                    // TCP port to connect to

                    //Recipients
                    $mail->setFrom('bmihairaul@gmail.com', 'MyBooks@library.com');
                    $mail->addAddress($eMail);                 // Add a recipient. Name is optional
                    $mail->addReplyTo('info@example.com', 'Information');


                    //Attachments
                    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
                    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

                    //Content
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Confirm Account';
                    $mail->Body    = "<html>
                                          <head><title>Hi :-)</title></head>
                                            <body>
                                          <a href=\"https://eqp326.edu.csesalford.com/
                                          emailConfirm.php?eMail=$eMail&code=$confirmCode\">Click to confirm account</a>
                                            </body>
                                      </html>";

                    if($mail->send()){

                        $sqlQuery = "INSERT INTO Users (eMail, phoneNumber, houseNumber, streetName, city, country, 
                        postCode, password, confirmed, confirmCode) VALUES ('$eMail', '$mobileNumber', '$houseNumber', 
                      '$streetName', '$city', '$country', '$postCode', '$passwordHash', 0, '$confirmCode')";
                        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
                        $statement->execute(); // execute the PDO statement

                        echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-success text-center text-success">
                                Registration Complete. Please confirm your e-Mail!
                        </br></p>';
                    }
                    else {
                        echo 'Mail not sent';
                    }
                }
                catch (Exception $e) {
                    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
                }
            }
    }

    /**
     * The method tests the user input in a securely manner.
     * @param $data
     * @return string
     */
    public function test_input($data) {
        if(empty($data) || is_null($data))
        {
            echo '<script>alert("You need to complete all the fields in order to proceed!")</script>';
        }
        else {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
    }

    /**
     * The method checks to see if a user with a e-Mail inserted for registering exist or not.
     * @param $enteredEmail
     * @return bool
     */
    public function checkEmail($enteredEmail){
        $sqlQuery = "SELECT eMail FROM Users Where eMail = '$enteredEmail'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement
        if($statement->rowCount() > 0){
            return true;
        }
    }

    /**
     * The method checks to see if a mobile phone number is used by someone else.
     * @param $mobileNumber
     * @return bool
     */
    public function checkPhoneNumber($mobileNumber){
        $sqlQuery = "SELECT phoneNumber FROM Users Where phoneNumber = '$mobileNumber'";
        $statement = $this->_dbHandle->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(); // execute the PDO statement
        if($statement->rowCount() > 0){
            return true;
        }
    }

    /**
     * The method is invoked when a user clicks the link send to its e-Mail and hence it is
     * able to log in, while the confirmation code remains in the database for further use when for
     * instance a user would want to reset its password.
     * @param $field
     * @param $value
     * @param $eMail
     */
    public function updateUser($field, $value, $eMail){

        $sqlQuery = "UPDATE Users SET $field = '$value' WHERE eMail = '$eMail'";
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->execute();
        if( $statement->execute() ){
        }
        else {
            echo 'Something went wrong';
        }
    }

    /**
     * The method is called to see if a user has confirmed the link with the security code attached or not.
     * @param $_eMail
     * @param $_insertCode
     * @return bool
     */
    public function checkConfirmation($_eMail, $_insertCode){
        //$userFound = $this->searchUser('eMail', $_eMail);
        $userFound = $this->searchUser($_eMail);
        $_code = $userFound->getConfirmCode();
        if($_code == $_insertCode) {
            $this->updateUser('confirmed', '1', $_eMail);
            return true;
        }
        else {
            return false;
        }

    }


    public function logIn($post){
        $email = $this->test_input($post['emailLogIn']);
        $user = $this->searchUser($email); // get the person obj
        if($user) // if the user exists
        {
            $password = $this->test_input($_POST["passwordLogIn"]);
            $salt = "alabalaportocala";
            if(password_verify($password . $salt, $user->getPassword()))
            {

                if($user->getConfirmed()) {
                    $_SESSION['userID'] = $user->getIdUser();
                    $_SESSION['userEmail'] = $user->getEMail();
                    return true;
                }
                else {

                    echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-info text-center text-info">
                    Please confirm your e-mail in order to log in.
            </br></p>';

                }

            }
            else {

                echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    Password do not match. Please, try again!
            </br></p>';

            }
        }
        else {

            echo '<p style="font-size: 20px; margin-bottom: 15px;"  class="bg-danger text-center text-danger">
                    E-mail not found. Please try again!
            </br></p>';

        }

    return false;
    }

}