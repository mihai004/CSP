<?php
require ('OutputInterface.php');
require ('SerializedArrayOutput.php');
require ('JsonStringOutput.php');
require ('ArrayOutput.php');

class Client
{
    protected $output;

    public function setOutput(OutputInterface $outputType){
        $this->output = $outputType;
    }

    public function loadOutput($arrayOfData){
        return $this->output->load($arrayOfData);
    }
}