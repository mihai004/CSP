<?php

class SerializedArrayOutput implements OutputInterface
{
    public function load($arrayOfData)
    {
        // TODO: Implement load() method.
        return serialize($arrayOfData);
    }
}