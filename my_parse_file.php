<?php

if(isset($_POST['firstname'])) {
    if (!empty($_POST['firstname'])) {
        echo 'Thank you ' . $_POST['firstname'] . ' ' . $_POST['lastname'] . ', says the PHP file';
    }
}else {
    require_once ('Views/example.phtml');
}
