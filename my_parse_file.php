<?php ////require ('Views/my_parse_file.phtml');
////$myJSON = '{ "name":"John", "age":30, "city":"New York" }';
////
////echo "myFunc(".$myJSON.");";
//
////header("Content-Type: application/json; charset=UTF-8");
////$v = json_decode(stripslashes($_GET["data"]));
////var_dump($v);
///////$obj = json_decode($_GET["x"], false);
//////var_dump($_GET["x"]);
//////echo $obj->table;
//////$conn = new mysqli("myServer", "myUser", "myPassword", "Northwind");
//////$result = $conn->query("SELECT name FROM ".$obj->table." LIMIT ".$obj->limit);
////$outp = array();
//////$outp = $result->fetch_all(MYSQLI_ASSOC);
////$outp = "test";
////
////echo json_encode($outp);
////header("Content-Type: application/json");
//
//// Handling data in JSON format on the server-side using PHP
////
//
////header("Content-type", "application/json");
//var_dump($_POST);
//echo json_decode($_POST[0]);
////print_r($_POST);
////$v = json_decode($_POST);
//$v="";
//if($v==="")
//{
//    require ('Views/my_parse_file.phtml');
//}
////var_dump($_GET);
//// build a PHP variable from JSON sent using POST method
////$v = json_decode(stripslashes(file_get_contents("php://input")));
//// build a PHP variable from JSON sent using GET method
////$v = json_decode(stripslashes($_GET["data"]));
//// encode the PHP variable to JSON and send it back on client-side
////echo json_encode($v);
///
///
require ('Models/ReviewDataSet.php');
if(empty($_POST)){
require ('Views/my_parse_file.phtml');
} else {

$obj = json_decode($_POST["x"], false);

$reviewDataSet = new ReviewDataSet();

$data = $reviewDataSet->getJsonFormat(3);

//$comments = $data;
//str_replace('\\u0000*\\u0000', "", json_encode($comments, JSON_FORCE_OBJECT));
//var_dump($comments);

//var_dump(json_encode($data[0], true));

//    $arrytest = array(array('a'=>1, 'b'=>2),array('a'=>3),array('a'=>4));
//
//// Force the outer structure into an object rather than array
//    echo json_encode($arrytest , JSON_FORCE_OBJECT);


//$comments = array($data);
//var_dump($comments[0][0]);




//$array = (array) $data[0];
////var_dump($array);
//echo '</br>';
//$json = str_replace('\\u0000*\\u0000', "", json_encode($array));
////var_dump($json);
//echo '</br>';
////var_dump($reviewDataSet->arrayToObject($data, true));
//$reorder = $reviewDataSet->arrayToObject($data[0], true);
//var_dump((array)$reorder);



//var_dump(json_decode(json_encode((array)$data)));


//$var = new StdClass();
//$allJsons = array();
//for ($i = 0; $i < sizeof($data); $i++){
//    $var = array_map('utf8_encode', (array)$data[$i]);
//    $json = str_replace('\\u0000*\\u0000', "", json_encode($var, JSON_PRETTY_PRINT));
//    array_push($allJsons, $json);
//
//}
//$all = str_replace('\\u0000*\\u0000', "", json_encode($allJsons));
//var_dump($all);
//echo (array) $allJsons;

//$var = array_map('utf8_encode', (array)$data[0]);
//$json = str_replace('\\u0000*\\u0000', "", json_encode($var));
//serialize($json);
//
////var_dump($json);
//echo $json;

//$json =  str_replace('\\u0000*\\u0000', "", json_encode($var));
//var_dump($json);
//echo $json;

//        $var = array_map('utf8_encode', (array)$dataSet[0]); // convert object to array
//        $json =  str_replace('\\u0000*\\u0000', "", json_encode($var));
//        echo '</br>';
//        var_dump($json);
//        echo '</br>';
//        $decode = (array) json_decode($json,true);
//        var_dump(array_values($decode)[2]);
//       // echo $decode['_emailUser'];



//echo json_encode($obj);
//
//
//    $myObj = new Object;
//    $myObj[0]->name = "John";
//    $myObj[0]->age = 30;
//    $myObj[0]->city = "New York";
//
//    $myObj[1]->name = "Peter";
//    $myObj[1]->age = 20;
//    $myObj[1]->city = "Paris";




//    $car = new stdClass();;
//    $car->name = "Volvo";
//    $car->age = 22;
//    $car2 = new stdClass();;
//    $car2->name = "Dacia";
//    $car2->age = 11;
//    $car3 = new stdClass();;
//    $car3->name = "Audi";
//    $car3->age = 33;
//
//    $cars = array
//    (
//        $car,
//        $car2,
//        $car3,
//    );
//
//    $myJSON = json_encode($cars);
//
//    echo $myJSON;
}