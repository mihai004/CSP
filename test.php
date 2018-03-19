<?php
require_once ('Views/template/header.phtml');


//echo $_POST['some-name'];
//var_dump($_POST);

if(isset($_POST['some-name']) and !empty($_POST['some-name']) ){
    echo '</br>';
    echo $_POST['some-name'] . "llll";
    //exit();
}
else{
    require_once ('Views/test.phtml');
    echo 'Please enter your name!';
   // exit();
}

//var_dump($_POST['userName']);
//$name = (isset($_POST['userName'])) ? $_POST['userName'] : 'no name';
//$computedString = "Hi, " . $name;
//$array = ['userName' => $name, 'computedString' => $computedString];
//echo json_encode($array);




//require ('Models/BookDataSet.php');
////require ('Views/template/header.phtml');
//
//$a[] = "Anna";
//$a[] = "Brittany";
//$a[] = "Cinderella";
//$a[] = "Diana";
//$a[] = "Eva";
//$a[] = "Fiona";
//$a[] = "Gunda";
//$a[] = "Hege";
//$a[] = "Inga";
//$a[] = "Johanna";
//$a[] = "Kitty";
//$a[] = "Linda";
//$a[] = "Nina";
//$a[] = "Ophelia";
//$a[] = "Petunia";
//$a[] = "Amanda";
//$a[] = "Raquel";
//$a[] = "Cindy";
//$a[] = "Doris";
//$a[] = "Eve";
//$a[] = "Evita";
//$a[] = "Sunniva";
//$a[] = "Tove";
//$a[] = "Unni";
//$a[] = "Violet";
//$a[] = "Liza";
//$a[] = "Elizabeth";
//$a[] = "Ellen";
//$a[] = "Wenche";
//$a[] = "Vicky";
//$q = '';
//// get the q parameter from URL
////$q = $_REQUEST["q"];
////if($q === null){
//    require_once ('Views/test.phtml');
////}
//
//$bookDataSet = new BooksDataSet();
//
//$x = $bookDataSet->fetchBooks();
////var_dump($x);
//if(isset($_REQUEST['q'])){
//    $q = $_REQUEST['q'];
//}
////$q = $_REQUEST["q"];
//$arr = array();
//$hint="";
//if($q !== ''){
//    $var = null;
//
//    $q = strtolower($q);
//    $len = strlen($q);
//    $i=0;
//    $myObj=null;
//    foreach ($x as $name){
//        if(stristr($q, substr($name->getBookName(), 0, $len))) {
//            if($hint === ""){
//                $arr[++$i] = $name->getBookName();
//            } else {
//                $arr[++$i] = $name->getBookName();
//            }
//            //var_dump(get_class($name));
//            //var_dump($name);
//            //$myJSON = json_encode($name);
//           // var_dump(json_decode($myJSON));
//            //array_push($arr, $x[$j]);
//        }
//    }
//    echo sizeof($arr);
////    foreach ($x as $name) {
////        if(stristr($q, substr($name->getBookName(), 0, $len))){
////
////
////            array_push($arr, $data);
//////            if($hint === ""){
//////            if($hint === ""){
//////                $arr[++$i] = $name;
//////            } else {
//////                $arr[++$i] = $name;
//////            }
////        }
//////        if(stristr($q, substr($name->getAuthor(), 0, $len))){
//////            if($hint === ""){
//////                $arr[++$i] += $name;
//////            } else {
//////                $arr[++$i] += $name;
//////            }
//////        }
////    }
//    echo '</br>';
//
//    if(empty($arr)) {
//        echo 'No results found';
//    } else {
//        echo '<ul class="list-group pre-scrollable">';
//        for($i=1; $i<=sizeof($arr); $i++){
//           echo '<option class="list-group-item" value="'. $arr[$i] .'"
//           onclick="getBook(this.value)">' . $arr[$i] . '</option>';
//       }
//        echo '</ul>';
//    }
//}
//
//
////// lookup all hints from array if $q is different from ""
////if ($q !== "") {
////    $q = strtolower($q);
////    $len=strlen($q);
////    foreach($a as $name) {
////        if (stristr($q, substr($name, 0, $len))) {
////            if ($hint === "") {
////                $hint = $name;
////            } else {
////                $hint .= ", $name";
////            }
////        }
////    }
////}
////
////// Output "no suggestion" if no hint was found or output correct values
////echo $hint === "" ? "no suggestion" : $hint;