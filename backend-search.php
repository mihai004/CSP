<?php //require ('Models/BookDataSet.php');
//
//$b = new BooksDataSet();
//$x = $b->fetchAllBooks(1, 100);
//$q=$_REQUEST["q"];
//
//$hint="";
//if($q !== ''){
//    $q = strtolower($q);
//    $len = strlen($q);
//    $arr=null;
//    $i=0;
//    foreach ($x as $name) {
//        if(stristr($q, substr($name->getBookName(), 0, $len))){
//            if($hint === ""){
//                $arr[$i++] = $name->getBookName();
//            } else {
//                $arr[$i++] = $name->getBookName();
//            }
//        }
//        if(stristr($q, substr($name->getAuthor(), 0, $len))){
//            if($hint === ""){
//                $arr[$i++] = $name->getAuthor();
//            } else {
//                $arr[$i++] = $name->getAuthor();
//            }
//        }
//    }
//    echo '<ul class="list-group">';
//    for($i=0; $i<sizeof($arr); $i++){
//        echo '<option class="list-group-item" value="'.$arr[$i].'" onclick="getBook(this.value)">' . $arr[$i] . '</li>';
//    }
//    echo '</ul>';
//}
//
