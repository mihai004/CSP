
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

    form.onkeydown = function(evt) {
        if (evt.keyCode === 27) {
            openSearch.classList.remove('open');
        }
    };

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
                    httpRequest.loadInComplete(this.responseText, displayArea);
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
                httpRequest.loadComplete('Data Loaded', displayArea);
            } catch(e) {
                httpRequest.loadInComplete(this.responseText, displayArea);
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

    // get the displayArea
    let displayArea = document.getElementById('displayBook');

    // get information for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                httpRequest.loadComplete('Item removed', displayArea);
                document.getElementById('bookSet'+idBook).innerHTML = '';
                document.getElementById('bookSets'+idBook).remove();        // remove from cart
            } catch (e) {
                httpRequest.loadInComplete('Item not removed', displayArea);
            }
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
    // get the displayArea
    let displayArea = document.getElementById('displayBook');

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
                httpRequest.loadComplete('Item removed', displayArea);
            } catch (e) {
                httpRequest.loadInComplete('Item not removed', displayArea);
            }
            }
        }
    }
}

function addCart(idBook){

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
    let displayArea = document.getElementById("displayBookMessage" + idBook);
    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                httpRequest.loadComplete('Item Added', displayArea);
            } catch (e) {
                httpRequest.loadInComplete('Item not removed', displayArea);
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
    // area where the message will be displayed according to each book ID
    let displayArea = document.getElementById('output-box');

    // get the response for HttpRequest
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                httpRequest.loadComplete('Item added', displayArea);
                updateBasketData(idBook, quantity, this.responseText);
            } catch (e) {
                httpRequest.loadInComplete('Item not added', displayArea);
            }
        }
    }
}




// work on next



function sendComment(formID, id){
    // prevent reload or refresh of the page
    //event.preventDefault();

    // get the method and the action of the form
    let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
    let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();

    // get values of the field
    let message = document.getElementById(formID).elements.namedItem('message').value;
    let obj, dbParam = '';
        obj = { "bookId":id, "message": message };
    dbParam = JSON.stringify(obj);
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
    event.preventDefault();
    let fd = new FormData();
   // let file = document.getElementById('fileToUpload').files[0];
    fd.append("fileToUpload", file);
    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadAborted, false);
    // xhr.open('POST', 'test.php', true);
    xhr.open("POST", "upload.php", true);
    //xhr.setRequestHeader("X-File-Name", file.name);
    //xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send(fd);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                xhr.responseText;
            } else {
                alert('error');
            }
        }
    };
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
    alert("works");
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

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
    let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();
    let btn = document.getElementById('registerBtn');
    let formInputs = document.getElementById(formID).querySelectorAll("input");
    let nr = 0;

    btn.addEventListener('click', function () {

        let formData = new FormData();                  // creates a formData object
        for (let i = 0; i < formInputs.length - 1; i++) { // the button is ignored
            if (formInputs[i].value.length < 1 || formInputs[i].value == 'Uncompleted field') {
                formInputs[i].value = 'Uncompleted field';
                formInputs[i].style.color = 'red';
            } else {
                nr++;
            }
        }
        if (nr == formInputs.length-1) {
            for (let i = 0; i < formInputs.length - 1; i++) {

                formData.append(formInputs[i].name, formInputs[i].value); // Add all inputs inside formData().
                // open the httpRequest
            }
            httpRequest.open(formMethod, formAction, true);
            // Set content type header information for sending url encoded variables in the request
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // Security measurement against XSS attack
            httpRequest.setRequestHeader('X-XSS-Protection', '1;mode=block');
            // send data
            httpRequest.send(formData);

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState < 4) {
                    selectForm.reset();                 // input fields are reset
                } else if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200 && httpRequest.DONE) {
                        $("#register-modal").modal('hide');
                        displayMsg(this.responseText, 'success', 'output-box');
                    } else {
                        selectForm.insertAdjacentHTML('beforeend', message.failure);
                    }
                }
            }

        }


    });
}

function logIn_form(formID){
    // prevent reload or refresh of the page
    event.preventDefault();

    // get the method and the action of the form
    let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
    let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();

    // get values of the field
    let firstField = document.getElementById(formID).elements.namedItem('emailLogIn').value;
    let secondField = document.getElementById(formID).elements.namedItem('passwordLogIn').value;

    // check input fields
    if (firstField === "" || firstField === null) {
        displayMsg("Email must be filled out", 'warning', 'output-box');         // display error message if true
    }
    else if (secondField === "" || secondField === null) {
        displayMsg("Password must be filled out", 'warning', 'output-box');      // display error message if true
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

        let vars = "emailLogIn="+firstField+"&passwordLogIn="+secondField;
        httpRequest.send(vars);

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.DONE) {
                document.getElementById(formID).elements.namedItem('emailLogIn').value = '';
                document.getElementById(formID).elements.namedItem('passwordLogIn').value = '';
                displayMsg(this.responseText, 'success', 'output-box');      // display result
            }
        };
    }
}



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




function loadReviews(id) {

    let obj, dbParam, start=0, end, xmlhttp, myValues = "";
    end = +5;
    start += +document.getElementById('loadBtn').value + +0;
    obj = { "bookId":id, "start":start, "end":end };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "product.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("progress", onProgress, false);
    xmlhttp.addEventListener("load", loadComplete, false);
    xmlhttp.addEventListener("error", loadInComplete, false);

    function loadInComplete(){
        displayMsg('No more reviews for this book. Feel free to share yours!', 'warning', 'progress-box');
    }

    function onProgress() {
        move();
    }

    function loadComplete() {
        let newBtn = document.getElementById('loadBtn');
        newBtn.textContent = 'Show More';
        document.getElementById('loadBtn').value = + document.getElementById('loadBtn').value + +5;
    }


    xmlhttp.send('load='+dbParam);
    let data = '';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                data = JSON.parse(this.responseText);
                let displayArea = document.getElementById('print');
                setStyleReviews(displayArea, data);
                // myValues.forEach(function (key) {
                //     let grandParent = document.createElement('div');
                //     grandParent.className = "w3-card-4 review-box";
                //
                //     let parent = document.createElement('div');
                //     parent.className = "w3-container w3-light-grey";
                //
                //     let child = document.createElement('div');
                //     child.className = "row";
                //
                //     let innerleftChild = document.createElement('div');
                //     innerleftChild.className = 'col-xs-12 col-sm-3';
                //     innerleftChild.style.paddingTop = '50px';
                //
                //     let image = document.createElement('img');
                //     image.src = '/images/default_avatar.png';
                //     image.className = 'img-circle';
                //     innerleftChild.appendChild(image);
                //
                //     let name = document.createElement('p');
                //     name.innerHTML = key._emailUser;
                //     name.id = 'userComment';
                //     innerleftChild.appendChild(name);
                //
                //     let innertrightChild = document.createElement('div');
                //     innertrightChild.className = 'col-sm-12 col-sm-4';
                //
                //     let comment = document.createElement('p');
                //     comment.innerHTML = key._comments;
                //     comment.id = 'comment';
                //     innertrightChild.appendChild(comment);
                //
                //     child.appendChild(innerleftChild);
                //     child.appendChild(innertrightChild);
                //
                //     let footer = document.createElement('div');
                //     footer.className = 'w3-footer';
                //     let date = document.createElement('p');
                //     footer.id = 'dateDisplay';
                //     footer.innerHTML = key._dateTime;
                //     footer.appendChild(date);
                //
                //     parent.appendChild(child);
                //     child.appendChild(footer);
                //     grandParent.appendChild(parent);
                //
                //     let d = document.getElementById('print');
                //     d.insertAdjacentElement('beforebegin', grandParent);

                    window.scrollTo(0, document.body.scrollHeight);
                //});
            }
            catch(e) {
                loadInComplete();
            }
        }
    };
}

function setStyleReviews(displayArea, data){
    let object = new ReviewDisplayTemplate();
    data.forEach( function (obj) {
        object.setStyleReview(displayArea, obj);
    });
}