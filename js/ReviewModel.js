class ReviewDisplayTemplate {

    constructor(){}

    /**
     * Styles the review object
     */
    setStyleReview(results, data){
            let grandParent = document.createElement('div');
            grandParent.className = "w3-card-4 review-box";

            let parent = document.createElement('div');
            parent.className = "w3-container w3-light-grey";

            let child = document.createElement('div');
            child.className = "row";

            let innerleftChild = document.createElement('div');
            innerleftChild.className = 'col-xs-12 col-sm-3';
            innerleftChild.style.paddingTop = '50px';

            let image = document.createElement('img');
            image.src = '/images/default_avatar.png';
            image.className = 'img-circle';
            innerleftChild.appendChild(image);

            let name = document.createElement('p');
            name.innerHTML = data._emailUser;
            name.id = 'userComment';
            innerleftChild.appendChild(name);

            let innertrightChild = document.createElement('div');
            innertrightChild.className = 'col-sm-12 col-sm-4';

            let comment = document.createElement('p');
            comment.innerHTML = data._comments;
            comment.id = 'comment';
            innertrightChild.appendChild(comment);

            child.appendChild(innerleftChild);
            child.appendChild(innertrightChild);

            let footer = document.createElement('div');
            footer.className = 'w3-footer';
            let date = document.createElement('p');
            footer.id = 'dateDisplay';
            footer.innerHTML = data._dateTime;
            footer.appendChild(date);

            parent.appendChild(child);
            child.appendChild(footer);
            grandParent.appendChild(parent);

            results.insertAdjacentElement('beforebegin', grandParent);
    }
}