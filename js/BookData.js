class BookData {

    constructor(){}

    /**
     * The constructor for BookData Object for JS controller.
     * @param idBook
     * @param bookName
     * @param author
     * @param category
     * @param price
     * @param numberInStock
     * @param photoName
     * @param views
     */
    // constructor(idBook, bookName, author, category, price, numberInStock, photoName, views){
    //     this._idBook = idBook;
    //     this._bookName = bookName;
    //     this._author = author;
    //     this._category = category;
    //     this._price = price;
    //     this._numberInStock = numberInStock;
    //     this._photoName = photoName;
    //     this._views = views;
    //     this.setStyle();
    // }

    /**
     * Styles the book object
     */
    setStyle(results, data){
        let parent = document.createElement('div');
        parent.addEventListener('click', function () {
            location.href = 'product.php?id=' + data._idBook;
        });
        parent.className = "row list-group-item";
        parent.style.height = '85px';

        let image = document.createElement('img');
        image.className = "col-sm-2 col-md-3 col-offset-lg-3";
        image.id = 'smallImg';
        image.src = '/images/' + data._photoName;
        parent.appendChild(image);

        let bookDetails = document.createElement('p');
        bookDetails.innerHTML = data._bookName + " by " + data._author;

        parent.appendChild(bookDetails);
        results.appendChild(parent);
    }

}