<?php
session_start();                      // the user logs out
$_SESSION['userID'] = null;           // the session is destroyed
session_destroy();
header('Location: index.php'); // redirects to home page
