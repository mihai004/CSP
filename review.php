<?php   require ('Models/ReviewDataSet.php');


//$client = new Client();
//$arrayOfData = array("Volvo", "BMW", "Toyota");
//$client->setOutput(new SerializedArrayOutput());
//$data = $client->loadOutput($arrayOfData);
//echo 'Serialised Array: ';
//var_dump($data);
//echo '</br>';
//$client->setOutput(new JsonStringOutput());
//$data = $client->loadOutput($arrayOfData);
//echo '</br>Output Json: ';
//var_dump($data, JSON_PRETTY_PRINT);
//$client->setOutput(new JsonStringOutput());
//$data = $client->loadOutput($arrayOfData);
//echo '</br>Output Array: ';
//$client->setOutput(new ArrayOutput());
//$data = $client->loadOutput($arrayOfData);
//var_dump($data);

$reviewDataSet = new ReviewDataSet();




$data = $reviewDataSet->getComments(2);

