<?php

/**
 * Created by PhpStorm.
 * User: eqp326
 * Date: 05/12/16
 * Time: 12:18
 */
class BookData
{
    protected $_idBook, $_bookName, $_author, $_category, $_price, $_numberInStock, $_photoName, $_views;

    /**
     * The BookData constructor.
     * @param $dbRow
     */
    public function __construct($dbRow)
    {
        $this->_idBook = $dbRow['idBook'];
        $this->_bookName = $dbRow['bookName'];
        $this->_author = $dbRow['author'];
        $this->_category = $dbRow['category'];
        $this->_price = $dbRow['price'];
        $this->_numberInStock = $dbRow['numberInStock'];
        $this->_photoName = $dbRow['photoName'];
        $this->_views = $dbRow['views'];
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
     * The getter for the field bookName
     * @return $bookName
     */
    public function getBookName()
    {
        return $this->_bookName;
    }

    /**
     * The getter for the field author
     * @return $author
     */
    public function getAuthor()
    {
        return $this->_author;
    }

    /**
     * The getter for the field category
     * @return $category
     */
    public function getCategory()
    {
        return $this->_category;
    }

    /**
     * The getter for the field price
     * @return $price
     */
    public function getPrice()
    {
        return number_format($this->_price, 2);
    }

    /**
     * The getter for the field numberInStock
     * @return $numberInStock
     */
    public function getNumberInStock()
    {
        return $this->_numberInStock;
    }

    /**
     * The getter for the field photoName
     * @return $photoName
     */
    public function getPhotoName()
    {
        return $this->_photoName;
    }

    /**
     * The getter for the field views
     * @return $views
     */
    public function getViews()
    {
        return $this->_views;
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
     * The setter for the field bookName
     * @param $bookName
     */
    public function setBookName($bookName)
    {
        $this->_bookName = $bookName;
    }

    /**
     * The setter for the field author
     * @param $author
     */
    public function setAuthor($author)
    {
        $this->_author = $author;
    }

    /**
     * The setter for the field category
     * @param $category
     */
    public function setCategory($category)
    {
        $this->_category = $category;
    }

    /**
     * The setter for the field price
     * @param $price
     */
    public function setPrice($price)
    {
        $this->_price = $price;
    }

    /**
     * The setter for the field numberInStock
     * @param $numberInStock
     */
    public function setNumberInStock($numberInStock)
    {
        $this->_numberInStock = $numberInStock;
    }

    /**
     * The setter for the field photoName
     * @param $photoName
     */
    public function setPhotoName($photoName)
    {
        $this->_photoName = $photoName;
    }

    /**
     * The setter for the field views
     * @param $views
     */
    public function setViews($views)
    {
        $this->_views = $views;
    }
}