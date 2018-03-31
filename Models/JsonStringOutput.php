<?php
class JsonStringOutput implements OutputInterface{
    public function load($arrayOfData)
    {
        $jsonArr = array();
        for($i = 0; $i < count($arrayOfData); $i++){
            $jsonArr[$i] = (array)$arrayOfData[$i];
        }
        $this->jsonRemoveUnicodeSequences($jsonArr);
    }

    public function jsonRemoveUnicodeSequences($array){
        echo str_replace('\\u0000*\\u0000', "", json_encode($array));
    }
}