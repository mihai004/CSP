class AjaxConnection {

    constructor(){
        this._xmlHttp = this.getXmlHttp();
        this._url = null;
        this._updateStatus = null;
    }

    getXmlHttp(){
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

    openConnection(method, url, updateStatus){
        this._xmlHttp.open(method, url, updateStatus);
    }

    setHeaders(contentType, value){
        this._xmlHttp.setRequestHeader(contentType, value);
    }

    sendData(){
        this._xmlHttp.send();
    }

    onreadystatechange() {
        this._xmlHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let myValues;
                let results = document.getElementById('livesearch');

                if (this.responseText === 'No results found. Try again!') {
                    results.innerHTML = 'No results found. Try again!';
                }
                else {
                    results.innerHTML = '';

                    myValues = JSON.parse(this.responseText);

                    myValues.forEach(function (key) {
                        let parent = document.createElement('div');
                        parent.addEventListener('click', function () {
                            location.href = 'product.php?id=' + key._idBook;
                        });
                        parent.className = "row list-group-item";
                        parent.style.height = '85px';

                        let image = document.createElement('img');
                        image.className = "col-sm-2 col-md-3 col-offset-lg-3";
                        image.id = 'smallImg';
                        image.src = '/images/' + key._photoName;
                        parent.appendChild(image);

                        let bookDetails = document.createElement('p');
                        // bookDetails.className = "col-sm-10 col-md-8 col-lg-10";
                        // bookDetails.href = 'product.php?id=' + key._idBook;
                        bookDetails.innerHTML = key._bookName + " by " + key._author;

                        parent.appendChild(bookDetails);

                        results.appendChild(parent);
                    });

                }
            }
        }
    }


    get xmlHttp() {
        return this._xmlHttp;
    }


    get url() {
        return this._url;
    }

    get updateStatus() {
        return this._updateStatus;
    }
}
// openx(method){
//     this.xmlHttp.open(method, this.url, true);
//     this.xmlHttp.onreadystatechange(this.updateStatus);
//     this.xmlHttp.send(null);
// }