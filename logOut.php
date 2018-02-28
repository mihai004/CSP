<?php

session_start();
$_SESSION['userID'] = null;
session_destroy();
header('Location: index.php'); // redirects to home page
