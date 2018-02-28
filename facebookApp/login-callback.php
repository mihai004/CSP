<?php
session_start();
ini_set('display_errors', 1);
require('../Models/UserDataSet.php');
require_once __DIR__ . '/src/Facebook/autoload.php';
$fb = new Facebook\Facebook([
  'app_id' => '1884276678467236',
  'app_secret' => '500eb90e9571912fb956d73ca41b6318',
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
    $requestProfile = $fb->get("/me?fields=name,first_name,last_name,age_range,email");
    $profile = $requestProfile->getGraphNode()->asArray();
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
  }

  $userDataSet = new UserDataSet();
   $user = $userDataSet->searchUser('email',$profile['email']);
   if($user){
	   $password = md5($profile['email'].$profile['last_name']);
	   if($user->checkPassword($password))
	   {
		   echo "you have successfully logged in";
		   header('location: ../');
		   $_SESSION['me'] = $user->getUserID();
		   echo $user->getUserID();
	   }else{
		   echo "wrong password";
		   echo " ".$password;
	   }
   }else{
	   echo "you are not registered";
   }
  
  exit;
} else {
    echo "Unauthorized access!!!";
    exit;
}
