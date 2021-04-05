var Card = (function () {
    function Card() {
    }
    Card.prototype.add = function (data, contentType) {
        var card = document.createElement('article');
        card.setAttribute('class', 'card');
        var title = document.createElement('span');
        title.setAttribute('class', 'card__title');
        title.innerText = data.title;
        var desc = document.createElement('span');
        desc.setAttribute('class', 'card__desc');
        desc.innerText = data.description;
        var content = document.createElement('span');
        content.setAttribute('class', 'card__content');
        switch (contentType) {
            case 'image':
                content.innerHTML = "<img src=\"" + data.content + "\" />";
                break;
            case 'video':
                var youtubeEmbed = Card.changeToEmbedLink(data.content);
                content.innerHTML = "\n        <iframe src=\"https://www.youtube.com/embed/" + youtubeEmbed + "\"></iframe>\n        ";
                break;
            case 'note':
                content.innerText = data.content;
                break;
            case 'todo':
                var todo = data.content.split(',');
                Card.makeToDoList(todo, content);
                break;
            default:
                throw new Error('unknown content type');
        }
        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'card__delete');
        deleteButton.innerHTML = "<i class=\"fas fa-minus-circle\" data-type=\"delete\"></i>";
        card.append(title);
        card.append(desc);
        card.append(content);
        card.append(deleteButton);
        if (!Card.cardsSection)
            throw new Error('html tag of cards section has problem');
        Card.cardsSection.append(card);
    };
    Card.prototype.delete = function (card) {
        card.remove();
    };
    Card.changeToEmbedLink = function (url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };
    Card.makeToDoList = function (todo, content) {
        for (var _i = 0, todo_1 = todo; _i < todo_1.length; _i++) {
            var ele = todo_1[_i];
            var item = document.createElement('span');
            item.setAttribute('class', 'content__todo');
            item.innerHTML = "\n      <input type=\"checkbox\" class=\"content__todo__checkbox\" />\n      <span>" + ele + "</span>\n      ";
            content.append(item);
        }
    };
    Card.cardsSection = document.querySelector('.cards');
    return Card;
}());
export default Card;
