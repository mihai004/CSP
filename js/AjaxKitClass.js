
/*
    Search engine methods
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
    let image = document.getElementById('loader');
    image.src = '/images/loader.gif';
    image.id = 'loader';
    image.style.background = 'none';
    image.style.marginLeft = '48%';
    image.style.height = '45px';
    image.style.width = '45px';
}

function showResults(searchingFor) {
    let http = new AjaxConnection();
    let results = document.getElementById('livesearch');

    http.openConnection("GET", "backend-search.php?searchFor=" + searchingFor, true);
    http.setHeaders("Content-type", "application/x-www-form-urlencoded");
    http.sendData();

    displayLoaderImg();

    if (checkInput(searchingFor) === true) {
        document.getElementById('loader').style.display = 'inline';
        getResponse(results, http);
    } else {
        document.getElementById('loader').style.display = 'none';
    }
}


function removeById(id){
    let removeAllBooks = document.getElementById(id);
    if(removeAllBooks != null){
        removeAllBooks.parentNode.removeChild(removeAllBooks);
    }
}

function filterInfo() {
    let urlComponentOne=document.getElementById('category').value;
    let urlComponentTwo=document.getElementById('nrInStock').value;
    let urlComponentThree=document.getElementById('price').value;

    let httpRequest = new AjaxConnection();

    let obj = { "category": urlComponentOne, "nrInStock": urlComponentTwo, "price": urlComponentThree};
    let dbParam = JSON.stringify(obj);

    // let state = {
    //     "canBeAnything": true
    // };
    // history.pushState(state, "FilteredInformation", "shopList.php?sort=" + encodeURIComponent(
    //     JSON.stringify(obj)
    // ));

    httpRequest.openConnection("GET", "shopList.php?sort=" + dbParam, true);
    httpRequest.setHeaders("Content-type", "application/x-www-form-urlencoded");
    httpRequest.sendData();


    removeById('removeBook');
    removeById('removePagination');
    removeById('itemPerPage');

    let displayArea = document.getElementById('displayBook');

    getResponse(displayArea, httpRequest);

}


/**
 * The method returns the controller's response for any httpRequest made.
 * @param displayArea
 * @param httpRequest
 */
function getResponse(displayArea, httpRequest) {
    let data = '';
    httpRequest.getxmlHttp().onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
             try {
                    data = JSON.parse(this.responseText);

                    displayArea.innerHTML = '';

                    if(displayArea.id === 'displayBook') {
                        displayPerPage(displayArea, data);
                    } else if (displayArea.id === 'livesearch') {
                        displaySearchResults(displayArea, data);
                    }
                    httpRequest.showLoadedData();

             } catch(e) {
                    httpRequest.loadInComplete(displayArea);
             }
        }
    }
}


function displaySearchResults(displayArea, data){
    let object = new BookData();
    data.forEach( function (obj) {
        object.setStyle(displayArea, obj);
    });
}


function displayPerPage(displayArea, data) {
    let object = new BookDisplay();
    data.forEach( function (obj) {
        object.setStyle(displayArea, obj);
    });
    object.setPagination(data)
}


function loadInComplete(){
    displayMsg('No more reviews for this book. Feel free to share yours!', 'warning', 'progress-box');
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

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {
                myValues = JSON.parse(this.responseText);

                myValues.forEach(function (key) {
                    let grandParent = document.createElement('div');
                    grandParent.className = "w3-card-4 review-box";

                    let parent = document.createElement('div');
                    parent.className = "w3-container w3-light-grey";

                    let child = document.createElement('div');
                    child.className = "row";

                    let innerleftChild = document.createElement('div');
                    innerleftChild.className = 'col-xs-12 col-sm-3';
                    innerleftChild.style.paddingTop = '50px';

                    let image = document.createElement('img');
                    image.src = '/images/default_avatar.png';
                    image.className = 'img-circle';
                    innerleftChild.appendChild(image);

                    let name = document.createElement('p');
                    name.innerHTML = key._emailUser;
                    name.id = 'userComment';
                    innerleftChild.appendChild(name);

                    let innertrightChild = document.createElement('div');
                    innertrightChild.className = 'col-sm-12 col-sm-4';

                    let comment = document.createElement('p');
                    comment.innerHTML = key._comments;
                    comment.id = 'comment';
                    innertrightChild.appendChild(comment);

                    child.appendChild(innerleftChild);
                    child.appendChild(innertrightChild);

                    let footer = document.createElement('div');
                    footer.className = 'w3-footer';
                    let date = document.createElement('p');
                    footer.id = 'dateDisplay';
                    footer.innerHTML = key._dateTime;
                    footer.appendChild(date);

                    parent.appendChild(child);
                    child.appendChild(footer);
                    grandParent.appendChild(parent);

                    let d = document.getElementById('print');
                    d.insertAdjacentElement('beforebegin', grandParent);

                    window.scrollTo(0, document.body.scrollHeight);
                });
            }
            catch(e) {
                loadInComplete();
            }
        }
    };
}


function checkOut() {

}


function removeFromCart(idBasket, idBook){
    event.preventDefault();
    console.log('bookSet'+idBook);
    console.log(document.getElementById('bookSet'+idBook));
    document.getElementById('bookSet'+idBook).innerHTML = '';

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // open the httpRequest
    httpRequest.open('POST', '/cartFunctions.php', true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Security measurement against XSS attack
    httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
    // send data
    httpRequest.send('removeFromCart=' + idBasket);

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                displayMsg('Item Removed', 'success', 'output-box');
                document.getElementById('bookSets'+idBook).remove();        // remove from list
            } else {
                alert('error');
            }
        }
    };
}

function calculatePrice(id, quantity){
    let price = document.getElementById('priceForItem'+id).innerHTML;
    let result = (parseFloat(price.replace(/[£,]+/g,"")) * parseInt(quantity));
    return ('£'+result.toFixed(2));

}


function removeFromCartMinus(idBasket, idBook){
    event.preventDefault();

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // open the httpRequest
    httpRequest.open('POST', '/cartFunctions.php', true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Security measurement against XSS attack
    httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
    // send data
    let quantity = document.getElementById('itemQuantity'+idBook).innerHTML;
    let nrOfBooks = document.getElementById('nrOfBooks').value;

    if(nrOfBooks <= 1 && quantity <= 1){
      //  document.getElementById('clearCart').style.display = 'none';
      //  document.getElementById('checkOut').style.display = 'none';
    }
    if(quantity <= 1){
        removeFromCart(idBasket, idBook);
        document.getElementById('nrOfBooks').value = --nrOfBooks;
    } else {
        httpRequest.send('removeForProductID=' + idBook);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    displayMsg('Item removed', 'warning', 'output-box');
                    $('#totalPriceForItem'+idBook).html(calculatePrice(idBook, --quantity));
                    $('#itemQuantity'+idBook).html(this.responseText);
                } else {
                    alert('error');
                }
            }
        };
    }
}


function addCartPlus(id){
    event.preventDefault();

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // open the httpRequest
    httpRequest.open('POST', '/cartFunctions.php', true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Security measurement against XSS attack
    httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
    // send data
    httpRequest.send('addForProductID=' + id);
    let quantity = document.getElementById('itemQuantity' + id).innerHTML;
    httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            displayMsg('Item added', 'success', 'output-box');
            $('#totalPriceForItem'+id).html(calculatePrice(id, ++quantity));
            $('#itemQuantity'+id).html(this.response);
        } else {
            displayMsg('Item could not be added', 'warning', 'output-box');
            alert('error');
        }
        }
    };
}

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "my_parse_file.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("fname=Henry&lname=Ford");
}



function c() {

    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "my_parse_file.php");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({name:"John Rambo", time:"2pm"}));

    // let url = "my_parse_file.php";
    //
    // let data = {};
    // data.firstname = "John";
    // data.lastname  = "Snow";
    // let json = JSON.stringify(data);
    //
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    // xhr.onload = function () {
    //     let users = JSON.parse(xhr.responseText);
    //     if (xhr.readyState == 4 && xhr.status == "201") {
    //         console.table(users);
    //     } else {
    //         console.error(users);
    //     }
    // };
    // xhr.send(json);


    // let xhr = new XMLHttpRequest();
    // let url = "/my_parse_file.php";
    // xhr.open("POST", url, true);
    // //xhr.setRequestHeader("Content-type", "application/json");
    // // let jsonData = {
    // //     address: 'address',
    // //     address1: 'address1',
    // //     address2: 'address2'
    // // };
    // // let out = JSON.stringify({'myPostData' : JSON.stringify(jsonData) });
    // let out ="test";
    // xhr.send(out);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //        // let json = JSON.parse(xhr.responseText);
    //        // console.log(json.email + ", " + json.password);
    //     }
    // };
}



function clickButton() {
    let s = document.createElement("script");
    s.src = "my_parse_file.php";
    document.body.appendChild(s);
}

function myFunc(myObj) {
    document.getElementById("demo").innerHTML = myObj.name;
}

function addCart(id){
    event.preventDefault();
    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // open the httpRequest
    httpRequest.open('POST', '/cartFunctions.php', true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Security measurement against XSS attack
    httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
    // send data
    httpRequest.send('addForProductID=' + id);
    let d = 'output-box' + id;
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log(d);
                displayMsg('Item added', 'success', d);
            } else {
                displayMsg('Item could not be added. LogIn first!', 'warning', 'output-box');
            }
        }
    };
}


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

    styleBox(displayBox);
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