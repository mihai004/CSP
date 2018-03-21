<?php
session_start();
ini_set('display_errors', 1);
require('../Models/UserDataSet.php');
require_once __DIR__ . '/src/Facebook/autoload.php';

$fb = new Facebook\Facebook([
  'app_id' => '178142802656847',
  'app_secret' => 'b184090a5ba96ff502917a1a596cd1f8',
  'default_graph_version' => 'v2.8'
]);

$helper = $fb->getJavaScriptHelper();

try {
  $accessToken = $helper->getAccessToken();
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
}

if (isset($accessToken)) {
   $fb->setDefaultAccessToken($accessToken);

  try {
  
    $requestProfile = $fb->get("/me?fields=name,first_name,last_name,age_range,picture.width(150).height(150),email");
    $profile = $requestProfile->getGraphNode()->asArray();
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
  }

  $userDataSet = new UserDataSet();
    $confirmCode = rand();
   $user = [

       "eMail" => $profile['emailReg'],
       "phoneNumber" => null,
       "houseNumber" => null,
       "streetName" => null,
       "city" => null,
       "country" => null,
       "postCode" => null,
       $salt = "alabalaportocala",
       $password = $profile['email'] . $salt,
       $passwordHash = password_hash($password, PASSWORD_BCRYPT),
       "password" => $passwordHash,
       "confirmed" => "1",
       "confirmCode" => $confirmCode
];

   $userDataSet->registerUser($user);
   $userDataSet->updateUser('userPhoto', $url ,$_SESSION['userID']);
  
 //header('Location: ../profile.php');   exit;
} else {
    echo "Unauthorized access!!!";
    exit;
}
