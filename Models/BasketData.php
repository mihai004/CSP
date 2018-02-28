<?php

/**
 * Created by PhpStorm.
 * User: blagamihairaul
 * Date: 13/12/2016
 * Time: 23:24
 */
class BasketData
{
    protected $_idBasket, $_userID, $_bookID, $_quantity;

    /**
     * The BasketData constructor.
     * @param $dbRow
     */
    public function __construct($dbRow) {
        $this->_idBasket = $dbRow['idBasket'];
        $this->_userID = $dbRow['idUser'];
        $this->_bookID = $dbRow['idBook'];
        $this->_quantity = $dbRow['quantity'];
    }

    /**
     * The getter for the field idBasket
     * @return $idBasket
     */
    public function getIdBasket()
    {
        return $this->_idBasket;
    }

    /**
     * The setter for the field idBasket
     * @param $idBasket
     */
    public function setIdBasket($idBasket)
    {
        $this->_idBasket = $idBasket;
    }

    /**
     * The getter for the field bookID
     * @return $bookID
     */
    public function getBookID()
    {
        return $this->_bookID;
    }

    /**
     * The setter for the field bookID
     * @param $bookID
     */
    public function setBookID($bookID)
    {
        $this->_bookID = $bookID;
    }


    /**
     * The getter for the field userID
     * @return $userID
     */
    public function getUserID()
    {
        return $this->_userID;
    }

    /**
     * The setter for the field userID
     * @param mixed $userID
     */
    public function setUserID($userID)
    {
        $this->_userID = $userID;
    }

    /**
     * The getter for the field quantity
     * @return $quantity
     */
    public function getQuantity()
    {
        return $this->_quantity;
    }

    /**
     *  The setter for the field $quantity
     *  @param $quantity
     */
    public function setQuantity($quantity)
    {
        $this->_quantity = $quantity;
    }

}