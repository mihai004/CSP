// No setters! For each connections there will be an object created.
class AjaxConnection {

     constructor() {
          this._xmlHttp = this.createXmlHttp(); // composition instead of inheritance
     }                                          // with composition you know what you get
                                                // no 'extra baggage'.
    /**
     * The getter for the reference object of type XMLHttpRequest
     * @returns {*}
     */
    getxmlHttp() {
        return this._xmlHttp;
    }

    /**
     * The method returns an XMLHttpRequest object.
     * @returns {*}
     */
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

    /**
     * The method opens the _xmlHttp connection.
     * @param method
     * @param url
     * @param updateStatus
     */
    openConnection(method, url, updateStatus) {
        this._xmlHttp.open(method, url, updateStatus);
    }

    /**
     * The method is used to set the appropriate headers.
     * @param contentType
     * @param value
     */
    setHeaders(contentType, value) {
        this._xmlHttp.setRequestHeader(contentType, value);
    }

    /**
     * The method is invoked to send data to the server.
     */
    sendData() {
        this._xmlHttp.send();
    }

    /**
     * The method is invoked to send data with parameters to the server (method overloading).
     * @param parameter
     */
    sendDataWithParam(parameter){
         this._xmlHttp.send(parameter);
    }

    /**
     * The method shows the progress of an xmlHttpRequest.
     */
    showProgress(){
        this._xmlHttp.addEventListener("progress", this.inProgress(), false);
    }

    /**
     * The method is invoked by the progress event listener.
     */
    inProgress(){
        console.log('in progress');
    }

    /**
     * The method shows the progress of uploading files to the server.
     * @param evt
     */
    uploadProgress(evt){
        this._xmlHttp.addEventListener("progress", this.uploadProgressStatus(evt), false);
    }

    /**
     * The method is invoked by the uploadProgress event listener.
     */
    uploadProgressStatus(evt){
        if(evt.lengthComputable){
            let percentComplete = Math.round(evt.loaded * 100/ evt.total);
            document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
        } else {
            document.getElementById('progressNumber').innerHTML = "unable to compute";
        }
    }

    /**
     * The method is invoked when data was loaded.
     */
    uploadProgressLoad(){
        this._xmlHttp.addEventListener("load", this.uploadComplete(), false);
    }

    /**
     * There was an error uploading file.
     */
    uploadError(){
        this._xmlHttp.addEventListener("error", this.uploadFailed(), false);
    }

    /**
     * The upload operation was aborted.
     */
    uploadAbort(){
        this._xmlHttp.addEventListener("abort", this.uploadAborted(), false);
    }

    /**
     * Upload Status.
     */
    uploadComplete() {
        console.log("works");
    }

    /**
     * Upload Status.
     */
    uploadFailed() {
        console.log("failed");
    }

    /**
     * Upload Status.
     */
    uploadAborted() {
        alert("aborted");
    }

    /**
     * The information from server was loaded.
     * @param msg
     * @param displayArea
     */
    loadComplete(msg, displayArea){
        this._xmlHttp.addEventListener("load", this.loaded(msg, displayArea), false);
    }

    /**
     * Method is invoked  when the data was loaded.
     * @param msg
     * @param displayArea
     */
    loaded(msg, displayArea){
        this.displayMsg(msg, 'success', displayArea);
    }

    /**
     * The data could be loaded.
     * @param msg
     * @param displayArea
     */
    loadInComplete(msg,displayArea){
        this._xmlHttp.addEventListener("error", this.showError(msg, displayArea), false);
    }

    /**
     * Show error is data was not loaded.
     * @param msg
     * @param displayArea
     */
    showError(msg, displayArea){
        this.displayMsg(msg, 'warning', displayArea);
    }

    /**
     * Display messages accordingly to the parameters passed.
     * @param msg
     * @param type
     * @param textBox
     */
    displayMsg(msg, type, textBox) {

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
        }, 3000);
    }

    /**
     * The method styles the display box used in the displayMsg method.
     * @param displayBox
     * @returns {*}
     */
    styleBox(displayBox){
        displayBox.style.position = 'relative';
        displayBox.style.textAlign = 'center';
        displayBox.style.fontSize = '20px';
        return displayBox;
    }
}
