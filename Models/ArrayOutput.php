<?php
class ArrayOutput implements OutputInterface
{
    public function load($arrayOfData)
    {
        // TODO: Implement load() method.
        sort($arrayOfData);
        return $arrayOfData;
    }
}