function showResult(searchingFor) {

    if (searchingFor.length===0) {
        document.getElementById("livesearch").innerHTML="";
        document.getElementById("livesearch").style.border="0px";
        document.getElementById("livesearch").innerHTML = "No input";
        return;
    }
    let myValues = "";
    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    httpRequest.open("GET", "backend-search.php?searchFor="+searchingFor, true);



    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    httpRequest.send();

    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            try {

                myValues = JSON.parse(this.responseText);
                console.log(myValues);
                let results = document.getElementById('livesearch');

                while (results.hasChildNodes()){
                    results.removeChild(results.lastChild);
                }

                myValues.forEach(function (key) {

                    let parent = document.createElement('a');
                    parent.href = '/product.php?id=' + key._idBook;
                    parent.id = "custom-option";
                    parent.className = 'row';

                    let image = document.createElement('img');
                    image.className = "col-sm-2 col-md-3";
                    image.id = 'smallImg';
                    image.src = '/images/' + key._photoName;
                    parent.appendChild(image);

                    let bookName = document.createElement('p');
                    bookName.className = "col-sm-5 col-md-3";
                    bookName.innerHTML = key._bookName;
                    parent.appendChild(bookName);

                    let bookAuthor = document.createElement('p');
                    bookAuthor.innerHTML = " by " + key._author;
                    bookAuthor.className = "col-sm-5 col-md-3";
                    parent.appendChild(bookAuthor);

                    results.appendChild(parent);

                });
            }
            catch(e) {
               // loadInComplete();
            }
        }
    };


    // if (window.XMLHttpRequest) {
    //     // code for IE7+, Firefox, Chrome, Opera, Safari
    //     xmlhttp=new XMLHttpRequest();
    // } else {  // code for IE6, IE5
    //     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // xmlhttp.onreadystatechange=function() {
    //     // if (this.readyState===4 && this.status===200) {
    //     //      document.getElementById("livesearch").innerHTML = this.responseText;
    //     // }
    // };
    // xmlhttp.open("GET","backend-search.php?searchFor=" + searchingFor, true);
    // xmlhttp.send();
}

function searchForm() {

    let openBtn = document.getElementById('searchBtn');
    let closeBtn = document.getElementById('closeBtn');
    let openSearch = document.getElementById('searching');
    openBtn.addEventListener('click', function () {
        event.preventDefault();
        openSearch.classList.add('open');
        document.forms['searchForm'].elements['searchFor'].focus();
    });

    closeBtn.addEventListener('click', function () {
            openSearch.classList.remove('open');
    });

}




function displayMsg(msg, type, textBox) {

    let boxTimeout = 0;
    let displayBox = document.createElement("div");
    if(type == 'warning'){
        displayBox.className = "alert alert-warning";
    }
    else if(type == 'success'){
        displayBox.className = "alert alert-success";
    }
    else if (type == 'info') {
        displayBox.className = "alert alert-info";
    } else if (type == 'danger') {
        displayBox.className = "alert alert-danger";
    }
    displayBox = styleBox(displayBox);
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
        document.getElementById('clearCart').style.display = 'none';
        document.getElementById('checkOut').style.display = 'none';
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
    displayMsg('Item added', 'success', 'output-box');

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



function register_form(formID) {
    event.preventDefault();

    let message = Object;
    message.loading = 'Complete the form..';
    message.success = 'Thank you for registering with us';
    message.failure = 'Whoops! There was a problem signing you up!';

    let selectForm = document.getElementById(formID);
   // let statusMessage = document.createElement('div');
   // statusMessage.className = 'status';

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
    let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();

    let formInputs = document.getElementById(formID).querySelectorAll("input");

    selectForm.addEventListener('click', function () {

        let formData = new FormData();                  // creates a formData object

        for (let i = 0; i < formInputs.length-1; i++) { // the button is ignored
            console.log(formInputs[i].value);
            formData.append(formInputs[i].name, formInputs[i].value); // Add all inputs inside formData().
        }

        //selectForm.appendChild(statusMessage);
        // open the httpRequest
        httpRequest.open(formMethod, formAction, true);
        // Set content type header information for sending url encoded variables in the request
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Security measurement against XSS attack
        httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
        // send data
        httpRequest.send(formData);

        httpRequest.onreadystatechange = function () {
            if(httpRequest.readyState < 4){
                   selectForm.reset();                 // input fields are reset
            } else if (httpRequest.readyState === 4){
                if (httpRequest.status === 200 && httpRequest.DONE) {
                    $("#register-modal").modal('hide');
                    displayMsg(this.responseText, 'success', 'output-box');
                } else{
                    selectForm.insertAdjacentHTML('beforeend', message.failure);
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
    console.log(formAction);
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

function styleBox(displayBox){
    displayBox.style.position = 'relative';
    displayBox.style.textAlign = 'center';
    displayBox.style.fontSize = '20px';
    return displayBox;
}


//
// $(document).ready(function() {
//
//     $(".custom-select").each(function () {
//         var classes = $(this).attr("class"),
//             id = $(this).attr("id"),
//             name = $(this).attr("name");
//         var template = '<div class="' + classes + '">';
//         template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
//         template += '<div class="custom-options">';
//         $(this).find("option").each(function () {
//             template += '<span  class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
//         });
//         template += '</div></div>';
//
//         $(this).wrap('<div class="custom-select-wrapper"></div>');
//         $(this).hide();
//         $(this).after(template);
//     });
//     $(".custom-option:first-of-type").hover(function () {
//         $(this).parents(".custom-options").addClass("option-hover");
//     }, function () {
//         $(this).parents(".custom-options").removeClass("option-hover");
//     });
//     $(".custom-select-trigger").on("click", function () {
//         $('html').one('click', function () {
//             $(".custom-select").removeClass("opened");
//         });
//         $(this).parents(".custom-select").toggleClass("opened");
//         event.stopPropagation();
//     });
//     $(".custom-option").on("click", function () {
//         $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
//         $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
//         $(this).addClass("selection");
//         $(this).parents(".custom-select").removeClass("opened");
//         $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
//     });
//
//
//     $("#myCarousel").carousel();
//
//     // Enable Carousel Indicators
//     $(".item1").click(function () {
//         $("#myCarousel").carousel(0);
//     });
//     $(".item2").click(function () {
//         $("#myCarousel").carousel(1);
//     });
//     $(".item3").click(function () {
//         $("#myCarousel").carousel(2);
//     });
//
//     // Enable Carousel Controls
//     $(".left").click(function () {
//         $("#myCarousel").carousel("prev");
//     });
//     $(".right").click(function () {
//         $("#myCarousel").carousel("next");
//     });
//
// });
//

//
//
//
// function openModal() {
//     document.getElementById('modal').style.display = 'block';
//     document.getElementById('fade').style.display = 'block';
// }
//
// function closeModal() {
//     document.getElementById('modal').style.display = 'none';
//     document.getElementById('fade').style.display = 'none';
// }




// function makeRequest(url, userName) {
//
//     httpRequest.onreadystatechange = alertContents;
//     httpRequest.open('POST', url);
//     httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     httpRequest.send('userName=' + encodeURIComponent(userName));
// }
//
// function alertContents() {
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//         if (httpRequest.status === 200) {
//             let response = JSON.parse(httpRequest.responseText);
//             alert(response.computedString);
//         } else {
//             alert('There was a problem with the request.');
//         }
//     }
// }


//
//
// class AjaxKitClass {
//     constructor(xmlHttp, url, updateStatus){
//         this._xmlHttp = xmlHttp;
//         this._url = url;
//         this._updateStatus = updateStatus;
//     }
//     open(method){
//         this.xmlHttp.open(method, this.url, true);
//         this.xmlHttp.onreadystatechange(this.updateStatus);
//         this.xmlHttp.send(null);
//     }
//
//     open2(method, param){
//         this.xmlHttp.open(method, this.url + param, true);
//         this.xmlHttp.onreadystatechange(this.updateStatus);
//         this.xmlHttp.send(null);
//     }
//
//     getData(){
//         if(this.xmlHttp.readyState === 4){
//             return this.xmlHttp.responseText;
//         }
//         return null;
//     }
//
//     get xmlHttp() {
//         return this._xmlHttp;
//     }
//
//     set xmlHttp(value) {
//         this._xmlHttp = value;
//     }
//
//     get url() {
//         return this._url;
//     }
//
//     set url(value) {
//         this._url = value;
//     }
//
//     get updateStatus() {
//         return this._updateStatus;
//     }
//
//     set updateStatus(value) {
//         this._updateStatus = value;
//     }
// }
//
// function validateEmail(inputText)
// {
//     //return (isMember ? "$2.00" : "$10.00");
//     let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return !!inputText.match(mailFormat);
//    // if(inputText.match(mailFormat)) {
//    //     return true;}
//    // return false;
// }
//
// // function validate_logIn(form) {
// //     form.submit(function(e) { // prevent form from submiting
// //         let eMail = document.getElementById("emailLogin").value;
// //         let password = document.getElementById("passwordLogin").value;
// //         if(eMail === "" || eMail === null){
// //             e.preventDefault();
// //             document.getElementById("emailLogin").focus();
// //             document.getElementById("reply").innerHTML = "No e-mail value entered!";
// //             setTimeout(function () {
// //                 $("#reply").html(" ");
// //             }, 2500);
// //         } else if (password === "" || password === null){
// //             e.preventDefault();
// //             document.getElementById("passwordLogin").focus();
// //             document.getElementById("reply").innerHTML = "No password entered!";
// //             setTimeout(function () {
// //                 $("#reply").html(" ");
// //             }, 2500);
// //         } else {
// //         }
// //     });
// // }
//
//
//
//
// $(document).ready(function() {
//
//     // let message = null;
//     // message.loading = "Loading";
//     // message.success = "Welcome";
//     // message.failure = "Whoops! There was a problem loading";
//
//     // let request = new XMLHttpRequest();
//     // request.open('POST', 'register.php', true);
//     // request.setRequestHeader('accept', 'application/json');
//     //
//     // let statusMessage = document.createElement('div');
//     // statusMessage.className = 'status';
//
//
//     // event.preventDefault();
//     // // let form = document.getElementById('logInForm');
//     //let myForm = document.getElementById('logInForm');
//
//     $("#logInForm").submit(function (e) {
//
//         e.preventDefault();
//
//
//
//         // ternary operator
//         // let request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//         // request.onreadystatechange = function () {
//         //     if (request.readyState === 4 && request.status === 200) {
//         //          //alert(request.responseText);
//         //     }
//         // };
//         // request.open("GET", "register.php", true);
//         // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//         // request.send(data);
//     });
// });
//            // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//
//
//             // request.open('POST', 'register.php', true);
//             //request.setRequestHeader('accept', 'application/json');
//
//           //  let statusMessage = document.createElement('div');
//            // statusMessage.className = 'status';
//             //request.send(form);
//
//         //     xmlttp.onreadystatechange = function (){
//         //     if(this.readyState === 4 && this.status === 200){
//         //         document.getElementById("demo").innerText = this.responseText;
//         //     }
//         // }
//         //     console.log(request.readyState);
//         //     request.onreadystatechange = function () {
//         //         if (request.readyState < 4){
//         //             console.log("great");
//         //         } else if (request.readyState === 4){
//         //             if(request.status === 200 && request.status < 200){
//         //                 console.log("posting");
//         //
//         //             } else
//         //             {
//         //                 console.log("not posting");
//         //                 //form.insertAdjacentHTML('beforeend', "failure");
//         //             }
//         //         } else {
//         //             console.log("not ready");
//         //         }
//         //     };
//         //     request.open("POST", "http://localhost:8000/register.php", true);
//         //     request.send();
//
//            // xmlhttp.open("GET", "test.php?q=" + str, true);
//             //xmlhttp.send();
//     //    });
// //});
//
//
//         // $("#logInForm").submit(function(e) {
//         // let eMail = document.getElementById("emailLogin").value;
//         // let password = document.getElementById("passwordLogin").value;
//         // if(eMail === "" || eMail === null){
//         //     e.preventDefault();
//         //     document.getElementById("emailLogin").focus();
//         //     document.getElementById("reply").innerHTML = "No e-mail value entered!";
//         //     setTimeout(function () {
//         //         $("#reply").html(" ");
//         //     }, 2500);
//         // } else if (password === "" || password === null){
//         //     e.preventDefault();
//         //     document.getElementById("passwordLogin").focus();
//         //     document.getElementById("reply").innerHTML = "No password entered!";
//         //     setTimeout(function () {
//         //         $("#reply").html(" ");
//         //     }, 2500);
//         // } else {
//         //
//         // }
//    // });
//
//
//
//     // $("#logInForm").submit(function(e) { // prevent form from submiting
//     //         let eMail = document.getElementById("emailLogin").value;
//     //         let password = document.getElementById("passwordLogin").value;
//     //         if(eMail === "" || eMail === null){
//     //             e.preventDefault();
//     //             document.getElementById("emailLogin").focus();
//     //             document.getElementById("reply").innerHTML = "No e-mail value entered!";
//     //             setTimeout(function () {
//     //                 $("#reply").html(" ");
//     //             }, 2500);
//     //         } else if (password === "" || password === null){
//     //             e.preventDefault();
//     //             document.getElementById("passwordLogin").focus();
//     //             document.getElementById("reply").innerHTML = "No password entered!";
//     //             setTimeout(function () {
//     //                 $("#reply").html(" ");
//     //             }, 2500);
//     //         } else {
//     //
//     //         }
//     // });
// //});
//
// function validate_form() {
//
//     // let eMail = document.getElementById("emailLogin").value;
//     // let password = document.getElementById("passwordLogin").value;
//     // // $.ajax({
//     // //     type: "POST",
//     // //     url: "logIn.php",
//     // //     data: {eMail_LogIn: eMail, password_LogIn: password},
//     // //     success: function (data) {
//     // //         alert("something");
//     // //         if (data.code === "200") {
//     // //             alert("Success " + data.msGetStats());
//     // //         } else {
//     // //             $("#reply").html("<ul>" + data.msGetStats() + "</ul>")
//     // //         }
//     // //     }
//     // // });
//     //
//     // if(eMail === ""){
//     //         document.getElementById("emailLogin").focus();
//     //         document.getElementById("reply").innerHTML = "No e-mail value entered!";
//     //         setTimeout(function () {
//     //             $("#reply").html(" ");
//     //         }, 2500);
//     // } else {
//     //     if(!(validateEmail(eMail))){
//     //         document.getElementById("reply").innerHTML = "Not a valid e-mail format!";
//     //         setTimeout(function () {
//     //             $("#reply").html(" ");
//     //         }, 2500);
//     //     } else {
//     //         if(password === ""){
//     //             document.getElementById("passwordLogin").focus();
//     //             document.getElementById("reply").innerHTML = "No password typed!";
//     //             setTimeout(function () {
//     //                 $("#reply").html(" ");
//     //             }, 2500);
//     //         } else if (eMail !== "" && password !== "") {
//     //             $.ajax({
//     //                 type: 'post',
//     //                 url: 'register.php',
//     //                 data: { eMail_LogIn : eMail, password_LogIn : password},
//     //                 success : function () {
//     //                     setTimeout(function () {
//     //                         $("#reply").html("Loading...");
//     //                     }, 2000);
//     //                 }, error: function(){
//     //                    // $("#reply").html("<ul>" + data.msGetStats() + "</ul>")
//     //                     alert("Error");
//     //                 }
//     //             });
//     //         }
//     //     }
//     //     return false;
//    // }
//
//
//     // $.ajax({
//     //    type: "POST",
//     //    url: "logIn.php",
//     //    dataType: "json",
//     //    data: { eMail_LogIn : eMail, password_LogIn : password},
//     //    success : function (data) {{
//     //        alert("something");
//     //        if(data.code === "200"){
//     //            alert("Success " + data.msGetStats());
//     //        } else {
//     //            $("#reply").html("<ul>" + data.msGetStats() + "</ul>")
//     //        }
//     //    }
//     //
//     //    }
//     // })
// }
//
//
// function test(str) {
//     // let care = 'x';
//     // alert(care);
//
//     if (str.length === 0) {
//         document.getElementById("txtHint").innerHTML = "";
//         return false;
//     } else {
//         var xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function() {
//             if (this.readyState === 4 && this.status === 200) {
//                 document.getElementById("txtHint").innerHTML = this.responseText;
//                 //var test = JSON.parse(this.response);
//                 //alert(this.responseText);
//             }
//         };
//         xmlhttp.open("GET", "test.php?q=" + str, true);
//         xmlhttp.send();
//     }
// }
//
// // function Calculator (n1, n2) {
// //     this.number1 = n1;
// //     this.number2 = n2;
// //     this.calculate = multiply;      // declartion of prototype for method
// //
// //     function multiply () {
// //         return this.number1 * this.number2;
// //     }
// // }
// // var myCalculator = new Calculator(3, 4);
// // console.log(myCalculator.calculate());
// // myCalculator.number1 = 6;
// // myCalculator.number2 = 7;
// // myCalculator.calculate();
// // console.log(myCalculator.calculate());
//
//
//     //
//     // function Person(first, last) {
//     //     this.firstName = first;
//     //     this.lastName = last;
//     //
//     //     this.details = function () {
//     //         console.log(this.firstName);
//     //         return this.firstName + " " + this.lastName;
//     //     };
//     //
//     // }
//
// //});
// // //     function loadFiles(str) {
// // //         document.write(str);
// // //         alert('Here' + str);
// // //     }
// // //}//
// //         // var xmlhttp = new XMLHttpRequest();
// //         // xmlttp.onreadystatechange = function (){
// //         //     if(this.readyState === 4 && this.status === 200){
// //         //         document.getElementById("demo").innerText = this.responseText;
// //         //     }
// //         // }
// //         // xmlhttp.open("GET", "test.php?x="+str, true);
// //         // xmlhttp.send();
// //
// //
// //         function Ajax() {
// //             this.name = function() {
// //                 alert('Here');
// //             };
// //             // this.xmlHttp = false;
// //             // this.url = "";
// //             // this.updateStatus = null;
// //
// //             // this.loadFile = function (str) {
// //             //     alert('Here');
// //             // }
// //
// //             // this.loadFiles = function (str) {
// //             //     document.write(str);
// //             //     alert('Here' + str);
// //             //     // var xmlhttp = new XMLHttpRequest();
// //             //     // xmlttp.onreadystatechange = function (){
// //             //     //     if(this.readyState === 4 && this.status === 200){
// //             //     //         document.getElementById("demo").innerText = this.responseText;
// //             //     //     }
// //             //     // }
// //             //     // xmlhttp.open("GET", "test.php?x="+str, true);
// //             //     // xmlhttp.send();
// //             // }
// //
// //
// //             this.Create = function (url, updateStatus) {
// //                 if(this.xmlHttp&&typeof XMLHttpRequest !== 'undefined'){
// //                     this.xmlHttp = new XMLHttpRequest();
// //                 }
// //                 this.url = url;
// //                 this.updateStatus = updateStatus;
// //             }
// //
// //             this.Open = function () {
// //                 this.xmlHttp.open("GET", this.url, true)
// //                 this.xmlHttp.onreadystatechange = this.updateStatus;
// //                 this.xmlHttp.send(null);
// //             }
// //
// //             this.GetData = function () {
// //                 if(this.xmlHttp.readyState === 4){
// //                     return this.xmlHttp.responseText;
// //                 }
// //             //     return 0;
// //             //}
// //         }
// //   //  }
// // //}