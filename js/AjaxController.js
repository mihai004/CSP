
/*
    Search engine functions based on input
 */

function searchForm() {

    let openBtn = document.getElementById('searchBtn');
    let closeBtn = document.getElementById('closeBtn');
    let openSearch = document.getElementById('searching');
    let form = document.forms['searchForm'].elements['searchFor'];

    openBtn.addEventListener('click', function () {
        event.preventDefault();
        openSearch.classList.add('open');
        form.focus();
    });

    // form.onkeydown = function(evt) {
    //     if (evt.keyCode === 27) {
    //         openSearch.classList.remove('open');
    //     }
    // };

    closeBtn.addEventListener('click', function () {
        openSearch.classList.remove('open');
    });
}

function showResults(searchingFor) {
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("GET", "backend-search.php?searchFor="+searchingFor, true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // send HttpRequest
    httpRequest.sendData();

    let displayArea = document.getElementById('livesearch');
    displayLoaderImg();

    if (checkInput(searchingFor) === true) {
        document.getElementById('loaderImg').style.display = 'inline';
        let data = '';
        httpRequest.getxmlHttp().onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200) {
                try {
                    data = JSON.parse(this.responseText);
                    displaySearchResults(displayArea, data);
                } catch(e) {
                    httpRequest.loadInComplete(this.responseText, 'livesearch');
                    displayArea.innerHTML = '';
                }
            }
        }
    } else {
        document.getElementById('loaderImg').style.display = 'none';
    }
}

function checkInput(searchingFor){
    if (searchingFor.length === 0) {
        document.getElementById("livesearch").innerHTML="";
        document.getElementById("livesearch").style.border="2px";
        document.getElementById("livesearch").style.marginTop = "15px";
        document.getElementById("livesearch").innerHTML = "No input!";
        let form = document.forms['searchForm'].elements['searchFor'];
        form.onkeydown = function(evt) {
            if (evt.keyCode === 8) {
                document.getElementById('searching').classList.remove('open');
            }
        };
        return false;
    }
    return true;
}

function displayLoaderImg(){
    let image = document.getElementById('loaderImg');
    image.id = 'loaderImg';
}

function displaySearchResults(displayArea, data){
    displayArea.innerHTML = '';
    let object = new BookDisplayTemplate();
    data.forEach( function (obj) {
        object.setStyleSearchedBooks(displayArea, obj);
    });
}

/*
    Filter information based on 3 values functions
  */

function filterInfo() {
    // get the filter values
    let urlComponentOne = document.getElementById('category').value;
    let urlComponentTwo = document.getElementById('nrInStock').value;
    let urlComponentThree =document.getElementById('price').value;

    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // get filter options
    let obj = { "category": urlComponentOne, "nrInStock": urlComponentTwo, "price": urlComponentThree};
    let dbParam = JSON.stringify(obj);
    // open the httpRequest
    httpRequest.openConnection("GET", "shopList.php?sort=" + dbParam, true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // send HttpRequest
    httpRequest.sendData();

    // remove old data from the web page based on ids
    removeById('removeBook');
    removeById('removePagination');
    removeById('itemPerPage');

    // get the displayArea
    let displayArea = document.getElementById('displayBook');

    // declare and initialize a variable that will hold the result of HttpRequest
    let data = '';

    // get information for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            try {
                data = JSON.parse(this.responseText);
                displaySortResults(displayArea, data);
                httpRequest.loadComplete('Data Loaded', 'displayBook');
            } catch(e) {
                httpRequest.loadInComplete(this.responseText, 'displayBook');
                displayArea.style.minHeight = '200px';
                displayArea.innerHTML = '';
            }
        }
    }
}

function displaySortResults(displayArea, data) {
    displayArea.innerHTML = '';
    let object = new BookDisplayTemplate();
    data.forEach( function (obj) {
        object.setStyleSortedBooks(displayArea, obj);
    });
    object.setPagination(data);
}

function removeById(id){
    let removeAllBooks = document.getElementById(id);
    if(removeAllBooks != null){
        removeAllBooks.parentNode.removeChild(removeAllBooks);
    }
}

/*
    Functions for basket such as add, add more than one item, remove one item, remove all items
  */

function calculatePrice(idBook, quantity){
    let price = document.getElementById('priceForItem' + idBook).innerHTML;
    let result = (parseFloat(price.replace(/[£,]+/g,"")) * parseInt(quantity));
    return ('£'+result.toFixed(2));

}

function updateBasketData(idBook, oldQuantity, newQuantity){
    $('#totalPriceForItem' + idBook).html(calculatePrice(idBook, --oldQuantity));
    $('#itemQuantity' + idBook).html(newQuantity);
}

function removeFromCart(idBasket, idBook){
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "cartFunctions.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // send HttpRequest
    httpRequest.sendDataWithParam('removeFromCart=' + idBasket);

    // get information for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
           // try {
               // alert(this.responseText);
               // httpRequest.loadComplete('Item removed', displayArea);
                document.getElementById('bookSet'+idBook).innerHTML = '';
                document.getElementById('bookSets'+idBook).remove();        // remove from cart
                httpRequest.loadComplete('Item removed', 'displayBookMessage');
          //  } catch (e) {
              //  httpRequest.loadInComplete('Item not removed', displayArea);
            //}
        }
    }
}

function removeFromCartMinus(idBasket, idBook) {
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "cartFunctions.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection', '1;mode=block');

    // get the old values of the items
    let quantity = document.getElementById('itemQuantity' + idBook).innerHTML;
    let nrOfBooks = document.getElementById('nrOfBooks').value;

    // check quantity
    if (nrOfBooks <= 1 && quantity <= 1) {
        document.getElementById('clearCart').style.display = 'none';
        document.getElementById('checkOut').style.display = 'none';
    }
    // remove item if none left
    if (quantity <= 1) {
        removeFromCart(idBasket, idBook);
        document.getElementById('nrOfBooks').value = --nrOfBooks;
    } else {
        // send HttpRequest
        httpRequest.sendDataWithParam('removeForProductID=' + idBook);
        // get the response for HttpRequest
        httpRequest.getxmlHttp().onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
            try {
                updateBasketData(idBook, quantity, this.responseText);
                httpRequest.loadComplete('Item removed', 'displayBookMessage');
            } catch (e) {
                httpRequest.loadInComplete('Item not removed', 'displayBookMessage');
            }
            }
        }
    }
}

function addOneBookToCart(idBook) {
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "cartFunctions.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // Send HttpRequest data
    httpRequest.sendDataWithParam('addForProductID=' + idBook);

    // area where the message will be displayed according to each book ID
    // let displayArea = document.getElementById('displayBookMessage' + idBook);

    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
                if(this.responseText !== '"logIn first!"'){
                    httpRequest.loadComplete('Item added', 'displayBookMessage' + idBook);
                }
                else {
                    httpRequest.loadInComplete(this.responseText, 'displayBookMessage' + idBook);
                }
        }
    }
}

function checkQuantity(min, max) {
    let quantity = document.getElementById('quantityPerItem');
    let message = document.getElementById('quantityCheckMessage');
    if(quantity.value === ''){
        message.innerHTML = '';
        quantity.style.border = '';
    } else if((isNaN(quantity.value))) {
        message.innerHTML = 'Only numbers please!';
    } else if(parseInt(quantity.value) >= min && parseInt(quantity.value) <= max ){
        message.innerHTML = '';
        quantity.style.border = 'thick solid green';
    }
    else {
        quantity.style.border = 'thick solid red';
        quantity.value = '';
        message.innerHTML = "The min is " + min + " max is " + max;
    }
}

function addMoreCart(idBook){

    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "cartFunctions.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // prepare data to be sent
    let quantity = document.getElementById('quantityPerItem').value;
    let obj = { "idBook": idBook, "quantity": quantity};
    let dbParam = JSON.stringify(obj);
    // Send HttpRequest data
    httpRequest.sendDataWithParam('addMoreProductID=' + dbParam);
    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText !== '"logIn first!"'){
                httpRequest.loadComplete('Item added', 'displayBookMessage');
            }
            else {
                httpRequest.loadInComplete(this.responseText, 'displayBookMessage');
            }
        }
    }
}

function addCartPlus(idBook){
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "cartFunctions.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // Send HttpRequest data
    httpRequest.sendDataWithParam('addForProductID=' + idBook);

    // get the actual quantity of the item
    let quantity = document.getElementById('itemQuantity' + idBook).innerHTML;

    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
                    try {
                        httpRequest.loadComplete('Item added', 'displayBookMessage');
                        updateBasketData(idBook, quantity, this.responseText);
                    } catch (e) {
                        httpRequest.loadInComplete('Item not added', 'displayBookMessage');
                }
            }
        }
}

function checkOut() {
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "basket.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // send HttpRequest
    httpRequest.sendDataWithParam("checkOut");

    // area to display messages
    let displayArea = document.getElementById('displayCartOperations');
    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                // In this case, for security purposes and payments the page is reloaded.
                location.href = 'basket.php?thankYou';
            } catch (e) {
                httpRequest.loadInComplete('Checkout Incomplete', displayArea);
            }
        }
    }
}

function removeAllItems(){
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "basket.php", true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // send HttpRequest
    httpRequest.sendDataWithParam("clearCart");

    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                displayCartMsgEmpty();
                let removeCartDisplay = document.getElementById('myList');
                removeCartDisplay.parentNode.removeChild(removeCartDisplay);
            } catch (e) {
                httpRequest.loadInComplete('Items not removed! Error', 'displayCartOperations');
            }
        }
    }
}

function displayCartMsgEmpty() {
    // area to display messages
    let displayArea = document.getElementById('displayCartOperations');
    displayArea.innerHTML = '<p  style="text-align: center; font-size: 20px;">      ' +
        'Your basket is empty. Feel free to <a style="color: #2b669a" href="../shopList.php">\n                           <b>check</b></a> out our ' +
        'latest offers!</p>';
    displayArea.style.marginTop = '150px';
}

// user logIn, register, send comment and upload image

function checkLogInFields(firstField, secondField) {
    if (firstField === "" || firstField === null) {
        displayMsg("Email must be filled out", 'warning', 'outputLogInStatus');         // display error message if true
        return true;
    }
    else if (secondField === "" || secondField === null) {
        displayMsg("Password must be filled out", 'warning', 'outputLogInStatus');      // display error message if true
        return true;
    } else {
        return false;
    }
}

function logIn_form(){
    // prevent reload or refresh of the page
    event.preventDefault();

    // get values of the field
    let firstField = document.getElementById('emailLogIn').value;
    let secondField = document.getElementById('passwordLogIn').value;

    // check input fields first
    if(checkLogInFields(firstField, secondField)!==true){
        // create an XMLHttpRequest object
        let httpRequest = new AjaxConnection();
        // open the httpRequest
        httpRequest.openConnection("POST", "logIn.php", true);
        // Set content type header information for sending url encoded variables in the request
        httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
        // The first parameter enables XSS filtering.
        // The second parameter than sanitizing the page,
        // the browser will prevent rendering of the page if an XSS attack is detected.
        httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
        // prepare data
        let obj = { "email": firstField, "password": secondField};
        let dbParam = JSON.stringify(obj);
        httpRequest.sendDataWithParam("logInCredentials=" + dbParam);
        // send HttpRequest
        httpRequest.getxmlHttp().onreadystatechange = function () {
            if (this.readyState === 4 && this.DONE) {
                if(this.responseText !== 'Welcome'){
                    httpRequest.loadInComplete(this.responseText, 'outputLogInStatus');
                }
            }
        };
        location.reload(); // for security reasons the page is reloaded if the logIn was successful
    }
}


// work on next



function sendComment(formID, id){
    // prevent reload or refresh of the page
    event.preventDefault();

    // get the method and the action of the form
    let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
    let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();

    // get values of the field
    let message = document.getElementById(formID).elements.namedItem('message').value;
    let obj = { "bookId":id, "message": message };
    let dbParam = JSON.stringify(obj);
    //console.log(obj);
    // check input fields
    if (message === "" || message === null) {
        displayMsg("Your review is empty!", 'warning', 'output-box');         // display error message if true
    } else {
        // initialise httpRequest
        let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        // open the httpRequest
        httpRequest.open(formMethod, formAction, true);
        // Security measurement against XSS attack
        httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
        // Set content type header information for sending url encoded variables in the request
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // Access the onreadystatechange event for the XMLHttpRequest object
       // httpRequest.send("message=" + message);
        httpRequest.send("message=" + dbParam);

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.DONE) {
                document.getElementById(formID).elements.namedItem('message').value = '';
                displayMsg(this.responseText, 'success', 'output-box');      // display result
            }
        };
    }

}


/*
    File upload
 */
function dropHandler(event){
    console.log('File(s) dropped');

    event.preventDefault();

    if(event.dataTransfer.items){
        for(let i = 0; i < event.dataTransfer.items.length; i++){
            if(event.dataTransfer.items[i].kind === 'file')
            {
                let file = event.dataTransfer.items[i].getAsFile();
                uploadFile(file);
                console.log('... file[' + i + '].name = ' + file.name);
            }
        }
    } else {
        for(let i = 0; i < event.dataTransfer.items.length; i++){
            console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
        }
    }

    removeDragData(event);
}

function dragOverHandler(event) {
    console.log(('File(s) in drop zone'));
    event.preventDefault();
}

function removeDragData(event) {
    console.log('Removing drag data');

    if(event.dataTransfer.files){
        event.dataTransfer.items.clear();
    } else {
        event.dataTransfer.clearData();
    }
}

function uploadFile(file) {

    // create a FormData object
    let fd = new FormData();
    // append the file to the form
    fd.append("fileToUpload", file);
    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "upload.php", true);
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // Send data
    httpRequest.sendDataWithParam(fd);
    // send HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                this.responseText;
            } else {
                this.responseText;
        }
    }
}

function uploadProgress(evt){
    if(evt.lengthComputable){
        let percentComplete = Math.round(evt.loaded * 100/ evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    } else {
        document.getElementById('progressNumber').innerHTML = "unable to compute";
    }
}

function uploadComplete() {
    console.log('works');
}
function uploadFailed() {
    alert("failed");
}
function uploadAborted() {
    alert("aborted");
}

function register_form(formID) {
    event.preventDefault();

    let selectForm = document.getElementById(formID);

    let btn = document.getElementById('registerBtn');
    let formInputs = document.getElementById(formID).querySelectorAll("input");
    let nr = 0;

    btn.addEventListener('click', function () {

        let formData = new FormData();                  // creates a formData object
        for (let i = 0; i < formInputs.length - 1; i++) { // the button is ignored
            if (formInputs[i].value.length < 1 || formInputs[i].value === 'Uncompleted field') {
                formInputs[i].value = 'Uncompleted field';
                formInputs[i].style.color = 'red';
            } else {
                nr++;
            }
        }
        if (nr === formInputs.length-1) {
            for (let i = 0; i < formInputs.length - 1; i++) {

                formData.append(formInputs[i].name, formInputs[i].value); // Add all inputs inside formData().

            }
            // create an XMLHttpRequest object
            let httpRequest = new AjaxConnection();
            // open the httpRequest
            httpRequest.openConnection("POST", "register.php", true);
            // Set content type header information for sending url encoded variables in the request
            httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
            // The first parameter enables XSS filtering.
            // The second parameter than sanitizing the page,
            // the browser will prevent rendering of the page if an XSS attack is detected.
            httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
            // prepare data
            let dbParam = JSON.stringify(formData);
            httpRequest.sendDataWithParam("registerFormData=" + dbParam);
            // send HttpRequest
            httpRequest.getxmlHttp().onreadystatechange = function () {
                    if (this.status === 200 && this.DONE) {
                        $("#register-modal").modal('hide');
                       // httpRequest.loadComplete(this.responseText, 'success', 'output-box');
                        displayMsg(this.responseText, 'success', 'output-box');
                    } else {
                       // httpRequest.loadInComplete('')
                        selectForm.insertAdjacentHTML('beforeend', 'failure');
                    }
            }
        }
    })
}






// function register_form(formID) {
//     event.preventDefault();
//
//     let selectForm = document.getElementById(formID);
//
//     let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//     let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
//     let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();
//     let btn = document.getElementById('registerBtn');
//     let formInputs = document.getElementById(formID).querySelectorAll("input");
//     let nr = 0;
//
//     btn.addEventListener('click', function () {
//
//         let formData = new FormData();                  // creates a formData object
//         for (let i = 0; i < formInputs.length - 1; i++) { // the button is ignored
//             if (formInputs[i].value.length < 1 || formInputs[i].value == 'Uncompleted field') {
//                 formInputs[i].value = 'Uncompleted field';
//                 formInputs[i].style.color = 'red';
//             } else {
//                 nr++;
//             }
//         }
//         if (nr == formInputs.length-1) {
//             for (let i = 0; i < formInputs.length - 1; i++) {
//
//                 formData.append(formInputs[i].name, formInputs[i].value); // Add all inputs inside formData().
//                 // open the httpRequest
//             }
//             httpRequest.open(formMethod, formAction, true);
//             // Set content type header information for sending url encoded variables in the request
//             httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             // Security measurement against XSS attack
//             httpRequest.setRequestHeader('X-XSS-Protection', '1;mode=block');
//             // send data
//             httpRequest.send(formData);
//
//             httpRequest.onreadystatechange = function () {
//                 if (httpRequest.readyState < 4) {
//                     selectForm.reset();                 // input fields are reset
//                 } else if (httpRequest.readyState === 4) {
//                     if (httpRequest.status === 200 && httpRequest.DONE) {
//                         $("#register-modal").modal('hide');
//                         displayMsg(this.responseText, 'success', 'output-box');
//                     } else {
//                         selectForm.insertAdjacentHTML('beforeend', message.failure);
//                     }
//                 }
//             }
//
//         }
//
//     });
// }



function onProgress() {
    move();
}

function move() {
    let elem = document.getElementById("myBar");
    let width = 0;
    let id = setInterval(frame, 0);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1  + '%';
        }
    }
}


/**
 * The function loads reviews based on the book a user is visualises.
 * @param id
 */
function loadReviews(id) {

    let obj, dbParam, start=0, end;
    end = +5;                                                   // bring each time the next 5 reviews
    start += +document.getElementById('loadBtn').value + +0;    // from the database. If no
    obj = { "bookId":id, "start":start, "end":end };
    dbParam = JSON.stringify(obj);

    // create an XMLHttpRequest object
    let httpRequest = new AjaxConnection();
    // open the httpRequest
    httpRequest.openConnection("POST", "product.php", true);

    // Set content type header information for sending url encoded variables in the request
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    // The first parameter enables XSS filtering.
    // The second parameter than sanitizing the page,
    // the browser will prevent rendering of the page if an XSS attack is detected.
    httpRequest.setHeaders('X-XSS-Protection','1;mode=block');
    // send HttpRequest
    httpRequest.sendDataWithParam('load='+dbParam);

    // display are for reviews
    let displayArea = document.getElementById('displayReviewMsg');
    let data = '';
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                data = JSON.parse(this.responseText);
                setStyleReviews(displayArea, data);
                httpRequest.loadComplete('Reviews loaded', 'print');
                let newBtn = document.getElementById('loadBtn');
                newBtn.textContent = 'Show More';
                document.getElementById('loadBtn').value = + document.getElementById('loadBtn').value + +5;
                window.scrollTo(0, document.body.scrollHeight); // scroll down to see the new
            } catch (e) {                                       // loaded Reviews.
                httpRequest.loadComplete('No more Reviews. Share yours!', 'print'); // if there are no more reviews,
            }                                                                      // a message will be displayed.
        }
    }
}

/**
 * The method styles the reviews that are going to be printed on the page when an event will occur.
 * @param displayArea
 * @param data
 */
function setStyleReviews(displayArea, data){
    let object = new ReviewDisplayTemplate();
    data.forEach( function (obj) {
        object.setStyleReview(displayArea, obj);
    });
}


/**
 * Display messages accordingly to the parameters passed.
 * @param msg
 * @param type
 * @param textBox
 */
function displayMsg(msg, type, textBox) {

    let boxTimeout = 0;
    let displayBox = document.createElement("div");
    if(type === 'warning'){
        displayBox.className = "alert alert-warning";
    }
    else if(type === 'success'){
        displayBox.className = "alert alert-success";
    }
    else if (type === 'info') {
        displayBox.className = "alert alert-info";
    } else if (type === 'danger') {
        displayBox.className = "alert alert-danger";
    }

    this.styleBox(displayBox);
    displayBox.innerHTML = msg;

    if (document.body.contains(displayBox)) {
        clearTimeout(boxTimeout);
    } else {
        let myTextBox = document.getElementById(textBox);
        myTextBox.parentNode.insertBefore(displayBox, myTextBox.previousSibling);
    }

    setTimeout(function() {
        displayBox.parentNode.removeChild(displayBox);
        boxTimeout = -1;
    }, 2000);
}

/**
 * The method styles the display box used in the displayMsg method.
 * @param displayBox
 * @returns {*}
 */
function styleBox(displayBox){
    displayBox.style.position = 'relative';
    displayBox.style.textAlign = 'center';
    displayBox.style.fontSize = '20px';
    return displayBox;
}