<?php

/**
 * Created by PhpStorm.
 * User: eqp326
 * Date: 17/12/16
 * Time: 16:15
 */
class ReviewData
{
    protected $_idReviews, $_idBook, $_emailUser, $_dateTime, $_comments;


    /**
     * The ReviewData constructor.
     * @param $dbRow
     */
    public function __construct($dbRow)
    {
        $this->_idReviews = $dbRow['idReviews'];
        $this->_idBook = $dbRow['idBook'];
        $this->_emailUser = $dbRow['emailUser'];
        $this->_dateTime = $dbRow['dateTime'];
        $this->_comments = $dbRow['comments'];
    }

    /**
     * The getter for the field idReviews
     * @return $idReviews
     */
    public function getIdReviews()
    {
        return $this->_idReviews;
    }

    /**
     * The setter for the field idReviews
     * @param $idReviews
     */
    public function setIdReviews($idReviews)
    {
        $this->_idReviews = $idReviews;
    }

    /**
     * The getter for the field idBook
     * @return $idBook
     */
    public function getIdBook()
    {
        return $this->_idBook;
    }

    /**
     * The setter for the field idBook
     * @param $idBook
     */
    public function setIdBook($idBook)
    {
        $this->_idBook = $idBook;
    }

    /**
     * The getter for the field emailUser
     * @return $emailUser
     */
    public function getUserEmail()
    {
        return $this->_emailUser;
    }

    /**
     * The setter for the field emailUser
     * @param mixed $emailUser
     */
    public function setIdUser($emailUser)
    {
        $this->_emailUser = $emailUser;
    }

    /**
     * The getter for the field dateTime
     * @return mixed
     */
    public function getDateTime()
    {
        return $this->_dateTime;
    }

    /**
     * The setter for the field dateTime
     * @param $dateTime
     */
    public function setDateTime($dateTime)
    {
        $this->_dateTime = $dateTime;
    }

    /**
     * The getter for the field comments
     * @return $comments
     */
    public function getComments()
    {
        return $this->_comments;
    }

    /**
     * The setter for the field comments
     * @param $comments
     */
    public function setComments($comments)
    {
        $this->_comments = $comments;
    }


}