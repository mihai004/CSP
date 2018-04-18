class AjaxConnection {

     constructor() {
          this._xmlHttp = this.createXmlHttp(); // composition instead of inheritance
     }                                          // with composition you know what you get
                                                // no 'extra baggage'
    getxmlHttp() {
        return this._xmlHttp;
    }

    createXmlHttp() {
        let xmlHttp;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlHttp = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlHttp;
    }

    openConnection(method, url, updateStatus) {
        this._xmlHttp.open(method, url, updateStatus);
    }

    setHeaders(contentType, value) {
        this._xmlHttp.setRequestHeader(contentType, value);
    }

    sendData() {
        this._xmlHttp.send();
    }

    showProgress(){
        this._xmlHttp.addEventListener("progress", this.inProgress(), false);
    }

    inProgress(){
        console.log('in progress');
    }


    showLoadedData(){
        this._xmlHttp.addEventListener("load", this.loaded(), false);
    }

    loaded(){
        console.log('loaded');
    }

    loadInComplete(displayArea){
        this._xmlHttp.addEventListener("error", this.showError(displayArea), false);
    }

    showError(displayArea){
        displayArea.innerText = 'No results found. Try Again';
    }
}
