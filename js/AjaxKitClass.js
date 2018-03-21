function checkOut() {
    
}


function removeFromCart(idBasket, idBook){
    event.preventDefault();

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // open the httpRequest
    httpRequest.open('POST', '/cartFunctions.php', true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Security measurement against XSS attack
    httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
    // send data
    httpRequest.send('removeFromCart=' + idBasket);
    console.log('aici' + idBook);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                $('#bookSet'+idBook).remove();
            } else {
                alert('error');
            }
        }
    };
}


function removeFromCartMinus(id, quantity){
    event.preventDefault();

    let httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // open the httpRequest
    httpRequest.open('POST', '/cartFunctions.php', true);
    // Set content type header information for sending url encoded variables in the request
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Security measurement against XSS attack
    httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
    // send data
    httpRequest.send('removeForProductID=' + id + '&quantity=' + quantity);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                $('#itemQuantity'+id).html(this.response);
            } else {
                alert('error');
            }
        }
    };
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
    httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            $('#itemQuantity'+id).html(this.response);
        } else {
            alert('error');
        }
        }
    };
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
                    displaMsg(this.responseText);
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
        displaMsg("Email must be filled out");         // display error message if true
    }
    else if (secondField === "" || secondField === null) {
        displaMsg("Password must be filled out");      // display error message if true
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
                displaMsg(this.responseText);      // display result
            }
        };
    }
}

function displaMsg(msg) {

    let warningTimeout = 0;
    let warningBox = document.createElement("div");
    warningBox.className = "warning alert alert-warning";

    warningBox.style.position = 'relative';
    warningBox.style.textAlign = 'center';
    warningBox.style.fontSize = '20px';
    warningBox.innerHTML = msg;

    if (document.body.contains(warningBox)) {
        window.clearTimeout(warningTimeout);
    } else {
        let myTextBox = document.getElementById('output-box');
        // insert warningBox after myTextbox
        myTextBox.parentNode.insertBefore(warningBox, myTextBox.previousSibling);
    }

    warningTimeout = window.setTimeout(function() {
        warningBox.parentNode.removeChild(warningBox);
        warningTimeout = -1;
    }, 2000);
}
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