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

    // getData(){
    //     if(this._xmlHttp.readyState === 4){
    //         return this._xmlHttp.responseText;
    //     }
    //     return null;
    // }


    // getResponse(){
    //      let data;
    //      this._xmlHttp.onreadystatechange = function () {
    //          if(this.readyState === 4 && this.status === 200) {
    //              data = JSON.parse(this.responseText);
    //              console.log(data);
    //          }
    //      };
    //      console.log(data);
    //      return data;
    // }


    // on(){
    //      this._xmlHttp.onreadystatechange = function () {
    //
    //      };
    // }


    // onreadystatechange(){
    //    // function handleResponse(response) {
    //        // alert(response);
    //         // return response;
    //    // }
    //    this._xmlHttp.onreadystatechange = function (){
    //         if(this.readyState === 4 && this.status === 200){
    //            // console.log(this.responseText);
    //              alert(this.responseText);
    //             //handleResponse(this.responseText);
    //         }
    //    };
    // }




    showProgress(onProgress){
        this._xmlHttp.addEventListener("progress", this.inProgress(), false);
    }

    inProgress(){
        console.log('in progress');
    }

    on(){
        return this._xmlHttp.onreadystatechange;
        // this._xmlHttp.addEventListener('onreadystatechange', this._xmlHttp.readyState >3 , true);

            //this.ready(this._xmlHttp.responseText);

        //}
        //console.log(this._xmlHttp.responseText);
       // this.ready();
        // this._xmlHttp.addEventListener('readystatechange', this.ready(), false);
    }

    r(){
         return this._xmlHttp;
    }

    ready(){
        alert(this.r().readyState);
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
