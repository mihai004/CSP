// let mvcPage = (function () {
//
//     let  controller = {
//         submitForm: function () {
//             if(model.firstName == ''){
//                 alert('Pls enter name:');
//             } else {
//                 model.names.push(model.firstName);
//                 view.renderNames();
//                 view.clear();
//             }
//         }
//     };
//
//     //views contain reference to all the UI elements we need to play with
//     let view = {
//
//         setup: function () {
//             view.firstnameInput = document.getElementById('txtName');
//             view.submitButton = document.getElementById('btnSubmit');
//             view.namesList = document.getElementById('names');
//         },
//
//
//         //action to render list of names
//         renderNames: function () {
//             view.namesList.innerText = model.names.join(",");
//         },
//
//         clear: function () {
//             view.firstnameInput.value = '';
//         }
//
//     };
//
//
//     //model contains data we need for or screen
//     let model = {
//         firstName: '',
//         names: [],
//     };
//
//
//     //bind events to objects in view
//     function bindEvents() {
//         if (window.addEventListener) {
//             view.submitButton.addEventListener('click', controller.submitForm, true);
//             view.firstnameInput.addEventListener('change', function () {
//                 model.firstName = view.firstnameInput.value
//                 }, false);
//         }
//         else if (window.attachEvent) {
//             view.submitButton.attachEvent('onclick', controller.submitForm, true);
//             view.firstnameInput.attachEvent('onchange', function () {
//                 model.firstName = view.firstnameInput.value
//                 }, false);
//         }
//     }
//
//
//
//     //initialize is the only method accessible outside
//     return {
//         initialize: function () {
//             view.setup();
//             bindEvents();
//         }
//
//     };
// });

class Book {
    constructor(jsonData){
        JSON.parse(jsonData);
    }
}

class View {

    constructor(model){
        this.model = model;
    }

    get getModel() { return this.model; }

    display() {
        console.log(this.getModel);
    }
}

class Controller{

    constructor(view){
        this.view = view;
    }
    informView = this.view.display();
}