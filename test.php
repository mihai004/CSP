<?php //require_once ('Views/template/header.phtml');
if ($_POST) {
    define('UPLOAD_DIR', 'uploads/');
    $img = $_POST['image'];
    $img = str_replace('data:image/jpeg;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_DIR . uniqid() . '.jpg';
    $success = file_put_contents($file, $data);
    print $success ? $file : 'Unable to save the file.';
} else {
    require ('Views/test.phtml');
}



//
//
////if($_FILES["fileToUpload"]["name"]){
//    require ('Views/test.phtml');
////}
//
//$target_dir = "uploads/";
//$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
//$uploadOk = 1;
//$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
//// Check if image file is a actual image or fake image
////if(isset($_POST["submit"])) {
//    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
//    if($check !== false) {
//      //  echo "File is an image - " . $check["mime"] . ".";
//        $uploadOk = 1;
//    } else {
//        require ('Views/test.phtml');
//     //   echo "File is not an image.";
//        $uploadOk = 0;
//    }
////}
//// Check if file already exists
//if (file_exists($target_file)) {
//    echo "Sorry, file already exists.";
//    $uploadOk = 0;
//}
////// Check file size
////if ($_FILES["fileToUpload"]["size"] > 500000) {
////    echo "Sorry, your file is too large.";
////    $uploadOk = 0;
////}
//// Allow certain file formats
//if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
//    && $imageFileType != "gif" ) {
//    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//    $uploadOk = 0;
//}
//// Check if $uploadOk is set to 0 by an error
//if ($uploadOk == 0) {
//    echo "Sorry, your file was not uploaded.";
//// if everything is ok, try to upload file
//} else {
//    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
//        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
//    } else {
//        echo "Sorry, there was an error uploading your file.";
//    }
//}
//
//
//
//////echo $_SERVER['HTTP_X_FILE_NAME'];
//////echo 'test' . file_get_contents($_SERVER['HTTP_X_FILE_NAME']);
////
////$target_dir = "uploads/";
////$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
//////echo $target_file;
////$uploadOk = 1;
////$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
////
////
////$file = $_FILES["fileToUpload"]["name"];
////if(move_uploaded_file($_FILES['fileToUpload'], '/Users/blagamihairaul/Desktop/SSP - Assignment /MyBooks/uploads')){
////    echo 'success';
////} else {
////    echo 'fail';
////}
//////$file = $_FILES['fileToUpload']['name'];
////if($file !== null){
////    var_dump($file);
//////        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
//////
//////        if($check !== false) {
//////            echo "File is an image - " . $check["mime"] . ".";
//////            $uploadOk = 1;
//////        } else {
//////            echo "File is not an image.";
//////            $uploadOk = 0;
//////        }
//////    if ($uploadOk == 0) {
//////        echo "Sorry, your file was not uploaded.";
//////// if everything is ok, try to upload file
//////    } else {
//////        ini_set('display_errors',1);
//////        if (move_uploaded_file($_FILES["fileToUpload"]["name"], $target_dir)) {
//////            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
//////        } else {
//////            echo "Sorry, there was an error uploading your file.";
//////        }
////   // }
////} else {
////    require_once ('Views/test.phtml');
////}
////
////
//////$target_dir = "uploads/";
//////$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
//////$uploadOk = 1;
//////$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
//////// Check if image file is a actual image or fake image
//////if(isset($_POST["submit"])) {
//////    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
//////    if($check !== false) {
//////        echo "File is an image - " . $check["mime"] . ".";
//////        $uploadOk = 1;
//////    } else {
//////        echo "File is not an image.";
//////        $uploadOk = 0;
//////    }
//////}
////
//////if(isset($_POST['some-name']) and !empty($_POST['some-name']) ){
//////    echo '</br>';
//////    echo $_POST['some-name'] . "llll";
//////    //exit();
//////}
//////else{
//////   require_once ('Views/test.phtml');
//////    echo 'Please enter your name!';
//////   // exit();
//////}
////
//////var_dump($_POST['userName']);
//////$name = (isset($_POST['userName'])) ? $_POST['userName'] : 'no name';
//////$computedString = "Hi, " . $name;
//////$array = ['userName' => $name, 'computedString' => $computedString];
//////echo json_encode($array);
////
////
////
////
//////require ('Models/BookDataSet.php');
////////require ('Views/template/header.phtml');
//////
//////$a[] = "Anna";
//////$a[] = "Brittany";
//////$a[] = "Cinderella";
//////$a[] = "Diana";
//////$a[] = "Eva";
//////$a[] = "Fiona";
//////$a[] = "Gunda";
//////$a[] = "Hege";
//////$a[] = "Inga";
//////$a[] = "Johanna";
//////$a[] = "Kitty";
//////$a[] = "Linda";
//////$a[] = "Nina";
//////$a[] = "Ophelia";
//////$a[] = "Petunia";
//////$a[] = "Amanda";
//////$a[] = "Raquel";
//////$a[] = "Cindy";
//////$a[] = "Doris";
//////$a[] = "Eve";
//////$a[] = "Evita";
//////$a[] = "Sunniva";
//////$a[] = "Tove";
//////$a[] = "Unni";
//////$a[] = "Violet";
//////$a[] = "Liza";
//////$a[] = "Elizabeth";
//////$a[] = "Ellen";
//////$a[] = "Wenche";
//////$a[] = "Vicky";
//////$q = '';
//////// get the q parameter from URL
////////$q = $_REQUEST["q"];
////////if($q === null){
//////    require_once ('Views/test.phtml');
////////}
//////
//////$bookDataSet = new BooksDataSet();
//////
//////$x = $bookDataSet->fetchBooks();
////////var_dump($x);
//////if(isset($_REQUEST['q'])){
//////    $q = $_REQUEST['q'];
//////}
////////$q = $_REQUEST["q"];
//////$arr = array();
//////$hint="";
//////if($q !== ''){
//////    $var = null;
//////
//////    $q = strtolower($q);
//////    $len = strlen($q);
//////    $i=0;
//////    $myObj=null;
//////    foreach ($x as $name){
//////        if(stristr($q, substr($name->getBookName(), 0, $len))) {
//////            if($hint === ""){
//////                $arr[++$i] = $name->getBookName();
//////            } else {
//////                $arr[++$i] = $name->getBookName();
//////            }
//////            //var_dump(get_class($name));
//////            //var_dump($name);
//////            //$myJSON = json_encode($name);
//////           // var_dump(json_decode($myJSON));
//////            //array_push($arr, $x[$j]);
//////        }
//////    }
//////    echo sizeof($arr);
////////    foreach ($x as $name) {
////////        if(stristr($q, substr($name->getBookName(), 0, $len))){
////////
////////
////////            array_push($arr, $data);
//////////            if($hint === ""){
//////////            if($hint === ""){
//////////                $arr[++$i] = $name;
//////////            } else {
//////////                $arr[++$i] = $name;
//////////            }
////////        }
//////////        if(stristr($q, substr($name->getAuthor(), 0, $len))){
//////////            if($hint === ""){
//////////                $arr[++$i] += $name;
//////////            } else {
//////////                $arr[++$i] += $name;
//////////            }
//////////        }
////////    }
//////    echo '</br>';
//////
//////    if(empty($arr)) {
//////        echo 'No results found';
//////    } else {
//////        echo '<ul class="list-group pre-scrollable">';
//////        for($i=1; $i<=sizeof($arr); $i++){
//////           echo '<option class="list-group-item" value="'. $arr[$i] .'"
//////           onclick="getBook(this.value)">' . $arr[$i] . '</option>';
//////       }
//////        echo '</ul>';
//////    }
//////}
//////
//////
////////// lookup all hints from array if $q is different from ""
////////if ($q !== "") {
////////    $q = strtolower($q);
////////    $len=strlen($q);
////////    foreach($a as $name) {
////////        if (stristr($q, substr($name, 0, $len))) {
////////            if ($hint === "") {
////////                $hint = $name;
////////            } else {
////////                $hint .= ", $name";
////////            }
////////        }
////////    }
////////}
////////
////////// Output "no suggestion" if no hint was found or output correct values
////////echo $hint === "" ? "no suggestion" : $hint;