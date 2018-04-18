class BookDisplayTemplate {
    constructor(){}

    setStyleSearchedBooks(results, data){
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


    setStyleSortedBooks(results, data) {
        let bookWrapper = document.createElement('div');
        bookWrapper .id = 'removeBook';
        bookWrapper .className = 'col-md-offset-1 col-xs-offset-0 col-lg-offset-1 col-sm-offset-1';
        let bookSet = document.createElement('div');
        bookSet.className = 'bookSet';
        bookSet.style.marginTop = '40px';
        bookSet.style.fontSize = '18px';

        let bookCard = document.createElement('div');
        bookCard.className = 'card';
        bookCard.style.textAlign = 'center';
        bookCard.style.margin = 'auto';
        bookCard.style.height = '250px';

        let book = document.createElement('div');
        book.id = 'output-box' + data._idBook;
        let wrapperImg = document.createElement('p');
        let imgBook = document.createElement('img');
        imgBook.src = '/images/' + data._photoName;
        imgBook.alt = 'no pic';

        wrapperImg.appendChild(imgBook);
        book.appendChild(wrapperImg);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style.fontSize = '18px';
        let cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title';
        cardTitle.style.marginBottom = '15px';
        cardTitle.style.height = '35px';
        cardTitle.innerHTML = data._bookName;

        cardBody.appendChild(cardTitle);

        let subCardTitle = document.createElement('h4');
        subCardTitle.className = 'card-title';
        subCardTitle.style.color = '#2b669a';
        let displayBy = document.createElement('b');
        displayBy.innerText = 'by: ';
        displayBy.style.color = 'black';
        subCardTitle.appendChild(displayBy);
        let italic = document.createElement('i');
        italic.innerText = data._author;
        subCardTitle.appendChild(italic);

        cardBody.appendChild(subCardTitle);

        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.style.color = '#f0ad4e';
        cardText.innerHTML = 'Amazing book';

        cardBody.appendChild(cardText);

        let secondCardBody = document.createElement('div');
        secondCardBody.className = 'card-body';

        let details = document.createElement('ul');
        details.className = 'list-group list-group-flush';
        details.style.listStyleType = 'none';

        let nrOfBooks = document.createElement('li');
        nrOfBooks.className = 'list-group-item-info';
        let bNr = document.createElement('b');
        bNr.innerText = data._numberInStock;
        bNr.style.color = 'black';
        nrOfBooks.innerHTML = 'Available: ';
        nrOfBooks.appendChild(bNr);

        let priceOfBook = document.createElement('li');
        priceOfBook.className = 'list-group-item-info';
        let bPrice = document.createElement('b');
        bPrice.innerText = '£' +data._price;
        bPrice.style.color = 'black';
        priceOfBook.innerHTML = 'Price: ';
        priceOfBook.appendChild(bPrice);

        details.appendChild(nrOfBooks);
        details.appendChild(priceOfBook);
        secondCardBody.appendChild(details);

        let cardFooter = document.createElement('div');
        let wrapperFooter = document.createElement('p');

        let linkBook = document.createElement('a');
        linkBook.href = 'product.php?id=' + data._idBook;
        let linkBold = document.createElement('b');
        linkBook.innerText = 'View Book';
        linkBook.style.color = 'black';
        linkBook.appendChild(linkBold);

        wrapperFooter.appendChild(linkBook);
        cardFooter.appendChild(wrapperFooter);

        let wrapperFooterBtn = document.createElement('p');
        let btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-success addToCart';
        btn.setAttribute('data-id', data._idBook);
        let preparedFunction = 'addCart(' + data._idBook + ')';
        btn.setAttribute('onclick', preparedFunction);
        btn.innerHTML = 'Add to';

        let btnSpan = document.createElement('span');
        btnSpan.className = 'glyphicon glyphicon-shopping-cart';

        btn.appendChild(btnSpan);
        wrapperFooterBtn.appendChild(btn);

        cardFooter.appendChild(wrapperFooterBtn);

        bookCard.appendChild(book);
        bookCard.appendChild(cardBody);
        bookCard.appendChild(secondCardBody);
        bookCard.appendChild(cardFooter);

        bookSet.appendChild(bookCard);
        bookWrapper.appendChild(bookSet);
        results.appendChild(bookWrapper );


    }

    setPagination(data){
        let paginationWrapper = document.createElement('div');
        paginationWrapper.id = 'removePagination';
        paginationWrapper.className = 'col-xs-12 text-center';
        paginationWrapper.style.marginBottom = '100px';

        let navPagination = document.createElement('nav');
        navPagination.setAttribute('aria-label', 'Page navigation');

        let pageList = document.createElement('ul');
        pageList.className = 'pagination';


        const perPage = Math.ceil(data.length / 2);
        if(perPage>1) {

            let linkWrapperPrevious = document.createElement('li');
            let linkPrevious = document.createElement('a');

            let spanLinkPrevious = document.createElement('span');
            spanLinkPrevious.setAttribute('aria-hidden', 'true');
            linkPrevious.innerHTML = "<<";

            linkPrevious.appendChild(spanLinkPrevious);

            linkWrapperPrevious.appendChild(linkPrevious);
            pageList.appendChild(linkWrapperPrevious);
        }

        for(let i = 1; i <= perPage; i++) {
            let nrOfPages = document.createElement('li');
            let linkPage = document.createElement('a');
            linkPage.innerHTML = i.toString();
            linkPage.href = '/shoplist.php?limit=' + perPage+ '&page=' + +i.toString();
            nrOfPages.appendChild(linkPage);
            pageList.appendChild(nrOfPages);
        }

        if(perPage>1){
            let linkWrapperNext = document.createElement('li');
            let linkNext = document.createElement('a');

            let spanLinkNext = document.createElement('span');
            spanLinkNext.setAttribute('aria-hidden', 'true');
            linkNext.innerHTML = ">>";

            linkNext.appendChild(spanLinkNext);
            linkWrapperNext.appendChild(linkNext);

            pageList.appendChild(linkWrapperNext);
        }

        navPagination.appendChild(pageList);

        let paginationBody = document.getElementById('displayPagination');
        paginationWrapper.appendChild(navPagination);
        paginationBody.appendChild(paginationWrapper)

    }
}