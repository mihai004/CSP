class Employee {

    constructor(name){
        this.name = name
    }

    say() {
        console.log('I am employee ' + name);
    }
}

class Book{

    constructor(arr){
        this.id = arr._idBook;
        this.bookName = arr._bookName;
    }
}


class Vendor {

    constructor(name){
        this.name = name
    }

    say() {
        console.log('I am vendor ' + name);
    }
}


class EmployeeFactory {
    create(name){
        return new Employee(name);
    }
}

class VendorFactory {
    create(name){
        return new Vendor(name);
    }
}


function run(){

    let persons = [];
    let employeeFactory = new EmployeeFactory();
    let vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create('Andrei'));
    persons.push(employeeFactory.create('Vasile'));
    persons.push(vendorFactory.create('Florin'));
    persons.push(vendorFactory.create('Raul'));

    for(let i = 0; i < persons.length; i++){
        persons[i].say();
    }

}