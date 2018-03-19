


// function ajax_form(formID, buttonID, resultID, method) {
//     // event.preventDefault();
//     let selectForm = document.getElementById(formID); // Select the form by ID.
//     let selectButton = document.getElementById(buttonID); // Select the button by ID.
//     let selectResult = document.getElementById(resultID); // Select result element by ID.
//     let formAction = document.getElementById(formID).getAttribute('action'); // Get the form action.
//     let formInputs = document.getElementById(formID).querySelectorAll("input"); // Get the form inputs.
//     let formMethod = method;
//
//     alert(selectForm + selectButton + selectResult + formAction + formInputs + formMethod);
//     function create_XML_http() {
//             let httpRequest = new XMLHttpRequest();
//             let formData = new FormData();
//
//             for (let i = 0; i < formInputs.length-1; i++) { // the button is ignored
//                 if(formInputs[i].value.length < 1){
//                     displayWarning('Alert');
//                     // checkForm(formInputs[i].value);
//                     // selectForm.onsubmit = function () {
//                     //     return false;                   // it prevents refresh
//                     // };
//                 } else {
//                     console.log(formInputs[i].value.length);
//                     formData.append(formInputs[i].name, formInputs[i].value); // Add all inputs inside formData().
//                 }
//             }
//             httpRequest.onreadystatechange = function () {
//                 if (httpRequest.readyState === 4 && httpRequest.DONE) {
//                     alert(this.responseText);
//                     selectResult.innerHTML = this.responseText; // Display the result inside result element.
//                 }
//             };
//             httpRequest.open(formMethod, formAction, true);
//             httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
//             httpRequest.send(formData);
//         }
//
//     selectButton.onclick = function () { // If clicked on the button.
//         create_XML_http();
//     };
//
//     selectForm.onsubmit = function () {
//         alert('es');
//         return false;                   // it prevents refresh
//     };
// }

// }

// function newForm(){
//     validateForm()
// }

// function checkForm(myForm){
//     event.preventDefault();                   // stops page from refreshing
//     let form = document.getElementById(myForm);
//     for (let i = 0; i < form.length-1; i++) { // never take into account the button
//         if(form.elements[i].value.length > 0){
//
//         }
//     }
//     //alert(form);
// }


function logIn_form(formID){
    // prevent reload or refresh of the page
    event.preventDefault();

    // get the method and the action of the form
    let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
    let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();

    // get values of the field
    let firstField = document.getElementById(formID).elements.namedItem('emailLogIn').value;
    let secondField = document.getElementById(formID).elements.namedItem('passwordLogIn').value;
    let selectResult = document.getElementById('output-box');

    // check input fields
    if (firstField === "" || firstField === null) {
        displayWarning("Email must be filled out");         // display error message if true
    }
    else if (secondField === "" || secondField === null) {
        displayWarning("Password must be filled out");      // display error message if true
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
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.DONE) {
                document.getElementById(formID).elements.namedItem('emailLogIn').value = '';
                document.getElementById(formID).elements.namedItem('passwordLogIn').value = '';
                displayWarning(this.responseText);      // display result
            }
        };
        // prepare variables to be sent
        let vars = "emailLogIn="+firstField+"&passwordLogIn="+secondField;
        // Send the data to PHP now... and wait for response to update the status div
        httpRequest.send(vars);      // Actually execute the request
        //selectResult.innerHTML = "Loading...";
    }
}


//
// function ajax_post(){
//     // Create our XMLHttpRequest object
//     let hr = new XMLHttpRequest();
//     // Create some variables we need to send to our PHP file
//     let url = "logIn.php";
//     let fn = document.getElementById("emailLogIn").value;
//     let ln = document.getElementById("passwordLogIn").value;
//     if (fn === "" || fn === null) {
//         alert("Email must be filled out");
//     }
//     else if (ln === "" ||ln === null) {
//         alert("Password must be filled out");
//     } else {
//     let vars = "email="+fn+"&password="+ln;
//     hr.open("POST", url, true);
//     // Set content type header information for sending url encoded variables in the request
//     hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     // Access the onreadystatechange event for the XMLHttpRequest object
//     hr.onreadystatechange = function() {
//         if(hr.readyState === 4 && hr.status === 200) {
//             document.getElementById("output-box").innerHTML = hr.responseText;
//         }
//     };
//     // Send the data to PHP now... and wait for response to update the status div
//     hr.send(vars); // Actually execute the request
//     document.getElementById("output-box").innerHTML = "processing...";
//     }
// }
//
//
//
// //
// function validate_form(formID) {
//     event.preventDefault();                                                      // prevents the submission of the form.
//     let form = document.getElementById(formID);
//     let formMethod = document.getElementById(formID).getAttribute('method').toUpperCase();
//     let formAction = document.getElementById(formID).getAttribute('action').toLowerCase();
//                                                                                             // get values of the field
//     let firstField = document.getElementById(formID).elements.namedItem('emailLogIn').value;
//     let secondField = document.getElementById(formID).elements.namedItem('passwordLogIn').value;
//     let formInputs = document.getElementById(formID).querySelectorAll("input");
//     let selectResult = document.getElementById('output-box');                            // Select result element by ID.
//     if (firstField === "" || firstField === null) {
//         displayWarning("Email must be filled out");
//     }
//     else if (secondField === "" || secondField === null) {
//         displayWarning("Password must be filled out");
//     } else {
//        // sendData(form, formMethod, formAction, selectResult);
// //        let httpRequest = new XMLHttpRequest();
//
//         httpRequest.onreadystatechange = function () {
//             if (httpRequest.readyState === 4 && httpRequest.DONE) {
//                 console.log(this.responseText);
//                 document.getElementById('output-box').innerHTML = 'print';
//                 //selectResult.innerHTML = 'test' + this.response;
//             }
//         };//
//
//         httpRequest.open('POST', 'logIn.php', true);
//        // httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
//         httpRequest.send();
//     }
// }
//
// function sendData(form, formMethod, formAction, selectResult){
//     // let httpRequest = new XMLHttpRequest();
//     //
//     //
//     // httpRequest.onreadystatechange = function () {
//     //     if (httpRequest.readyState === 4 && httpRequest.DONE) {
//     //         document.getElementById('output-box').innerHTML = this.responseText;
//     //         //selectResult.innerHTML = 'test' + this.response;
//     //     }
//     // };
//     //
//     // httpRequest.open(formMethod, formAction, true);
//     // httpRequest.setRequestHeader('X-XSS-Protection','1;mode=block');
//     // httpRequest.send();
//
// }
//
//
// // function displaySuccess(msg){
// //     let successTimeout = 0;
// //     let successBox = document.createElement("div");
// //     successBox.className = "success alert alert-success";
// // }
//
//
//
function displayWarning(msg) {

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

// window.onload = function(){
//     document.getElementById("ajaxButton").onclick = function() {
//         let userName = document.getElementById("ajaxTextbox").value;
//         makeRequest('test.php', userName);
//     };
//
//     function makeRequest(url, userName) {
//         let httpRequest = new XMLHttpRequest();
//
//         if (!httpRequest) {
//             alert('Giving up :( Cannot create an XMLHTTP instance');
//             return false;
//         }
//         httpRequest.onreadystatechange = alertContents(httpRequest);
//         httpRequest.open('GET', url);
//         httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         httpRequest.send();
//     }
//
//     function alertContents(httpRequest) {
//         if (httpRequest.readyState === XMLHttpRequest.DONE) {
//             if (httpRequest.status === 200) {
//                 return httpRequest.responseText;
//             } else {
//                 alert('There was a problem with the request.');
//                 return null;
//             }
//         }
//     }
// };



// function alertContents(httpRequest) {
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//         if (httpRequest.status === 200) {
//             alert(httpRequest.responseText);
//         } else {
//             alert('There was a problem with the request.');
//         }
//     }
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

// //$(document).ready(function() {
//
// //});
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