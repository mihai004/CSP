<?php

class JsonStringOutput implements OutputInterface
{
    public function load($arrayOfData)
    {
        $myArray = array();
        $jsonArr = array();
            for($i = 0; $i < count($arrayOfData); $i++){
                $jsonArr[$i] =
                    (array)$arrayOfData[$i];
//            $jsonArr[$i] = str_replace('\\u0000*\\u0000', "",
//                (array)$arrayOfData[$i]);
        }
        echo str_replace('\\u0000*\\u0000', "", json_encode($jsonArr));

        //$arr = $myArray;
       // var_dump(json_encode($myArray, JSON_PRETTY_PRINT));

//        $jsonArr = array();
//        for($i = 0; $i < count($arrayOfData); $i++){
//            $jsonArr[$i] = json_encode((array)$arrayOfData[$i]);
//        }
//
//
//
//        var_dump(str_replace('\\u0000*\\u0000', "", $jsonArr));


        //echo 'here' . str_replace('\\u0000*\\u0000', "", $jsonArr[0]);
//        echo str_replace('\\u0000*\\u0000', "",$jsonArr[0]);
       // return $jsonArr;

//        $jsonArr = null;
//        for($i = 0; $i < count($arrayOfData); $i++){
//            $jsonArr['data'][$i] = str_replace('\\u0000*\\u0000', "",
//                json_encode((array)$arrayOfData[$i]));
//        }
//        str_replace('\\', '', json_encode($jsonArr));
//        var_dump($jsonArr);

    }

    public function loadJsonObj($obj){
//        $jsonObj = str_replace('\\u0000*\\u0000', "", json_encode((array)$obj, JSON_FORCE_OBJECT));
//        //var_dump($jsonObj);
//        return $jsonObj;
    }
}