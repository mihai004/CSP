<?php

class UserData
{
    protected $_idUser, $_eMail, $_phoneNumber, $_houseNr, $_streetName, $_city, $_country, $_postCode, $_password,
                $_confirmed, $_confirmCode;

    /**
     * The UserData constructor.
     * @param $dbRow
     */
    public function __construct($dbRow)
    {

        $this->_idUser = $dbRow['idUser'];
        $this->_eMail = $dbRow['eMail'];
        $this->_phoneNumber = $dbRow['phoneNumber'];
        $this->_houseNr = $dbRow['houseNumber'];
        $this->_streetName = $dbRow['streetName'];
        $this->_city = $dbRow['city'];
        $this->_country = $dbRow['country'];
        $this->_postCode = $dbRow['postCode'];
        $this->_password = $dbRow['password'];
        $this->_confirmed = $dbRow['confirmed'];
        $this->_confirmCode = $dbRow['confirmCode'];

    }

    /**
     * The getter for field idUser
     * @return $idUser
     */
    public function getIdUser()
    {
        return $this->_idUser;
    }

    /**
     * The setter for field idUser
     * @param $idUser
     */
    public function setIdUser($idUser)
    {
        $this->_idUser = $idUser;
    }

    /**
     * The getter for field eMail
     * @return $eMail
     */
    public function getEMail()
    {
        return $this->_eMail;
    }

    /**
     * The setter for field eMail
     * @param $eMail
     */
    public function setEMail($eMail)
    {
        $this->_eMail = $eMail;
    }

    /**
     * The getter for field phoneNumber
     * @return $phoneNumber
     */
    public function getPhoneNumber()
    {
        return $this->_phoneNumber;
    }

    /**
     * The setter for field phoneNumber
     * @param $phoneNumber
     */
    public function setPhoneNumber($phoneNumber)
    {
        $this->_phoneNumber = $phoneNumber;
    }

    /**
     * The getter for field houseNumber
     * @return $houserNr
     */
    public function getHouseNr()
    {
        return $this->_houseNr;
    }

    /**
     * The setter for field houseNumber
     * @param $houseNr
     */
    public function setHouseNr($houseNr)
    {
        $this->_houseNr = $houseNr;
    }

    /**
     * The getter for the field streetName
     * @return $streetName
     */
    public function getStreetName()
    {
        return $this->_streetName;
    }

    /**
     * The setter for the field streetName
     * @param $streetName
     */
    public function setStreetName($streetName)
    {
        $this->_streetName = $streetName;
    }

    /**
     * The getter for the field city
     * @return $city
     */
    public function getCity()
    {
        return $this->_city;
    }

    /**
     * The setter for the field city
     * @param $city
     */
    public function setCity($city)
    {
        $this->_city = $city;
    }

    /**
     * The getter for the field country
     * @return $country
     */
    public function getCountry()
    {
        return $this->_country;
    }

    /**
     * The setter for the field country
     * @param $country
     */
    public function setCountry($country)
    {
        $this->_country = $country;
    }

    /**
     * The getter for the field postCode
     * @return $postCode
     */
    public function getPostCode()
    {
        return $this->_postCode;
    }

    /**
     * The getter for the field postCode
     * @param $postCode
     */
    public function setPostCode($postCode)
    {
        $this->_postCode = $postCode;
    }

    /**
     * The getter for the field password
     * @return $password
     */
    public function getPassword()
    {
        return $this->_password;
    }

    /**
     * The setter for the field password
     * @param $password
     */
    public function setPassword($password)
    {
        $this->_password = $password;
    }

    /**
     * The getter for the field confirmed
     * @return $confirmed
     */
    public function getConfirmed()
    {
        return $this->_confirmed;
    }

    /**
     * The setter for the field confirmed
     * @param $confirmed
     */
    public function setConfirmed($confirmed)
    {
        $this->_confirmed = $confirmed;
    }

    /**
     * The getter for the field confirmCode
     * @return $confirmCode
     */
    public function getConfirmCode()
    {
        return $this->_confirmCode;
    }

    /**
     * The setter for the field confirmCode
     * @param $confirmCode
     */
    public function setConfirmCode($confirmCode)
    {
        $this->_confirmCode = $confirmCode;
    }
}