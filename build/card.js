var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Card = (function () {
    function Card() {
        var _this = this;
        var _a, _b, _c, _d;
        this.cardId = 0;
        this.add = function (data, contentType) {
            var card = document.createElement('article');
            card.setAttribute('class', 'card');
            card.setAttribute('draggable', 'true');
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
            card.append(content);
            card.append(desc);
            card.append(deleteButton);
            if (!Card.cardsSection)
                throw new Error('html tag of cards section has problem');
            Card.cardsSection.append(card);
        };
        this.drop = function (target) {
            if (!Card.cardsSection)
                throw new Error('no card section');
            var nodeList = Card.cardsSection.querySelectorAll('.card');
            if (!nodeList)
                return;
            var cards = [];
            var oldTargetOrder = null;
            var newTargetOrder = null;
            nodeList.forEach(function (v, i) {
                if (v === _this.dragTarget)
                    oldTargetOrder = i;
                else if (v === target)
                    newTargetOrder = i;
            });
            if (newTargetOrder === null || oldTargetOrder === null)
                throw new Error('there are no targets');
            if (newTargetOrder === nodeList.length)
                newTargetOrder++;
            for (var i = 0, max = nodeList.length; i < max; i++) {
                if (oldTargetOrder === newTargetOrder)
                    return;
                else if (oldTargetOrder < newTargetOrder) {
                    if (i > newTargetOrder)
                        cards.push({ node: nodeList[i], order: i });
                    else
                        cards.push({ node: nodeList[i], order: i - 1 });
                }
                else {
                    if (i < newTargetOrder)
                        cards.push({ node: nodeList[i], order: i });
                    else
                        cards.push({ node: nodeList[i], order: i + 1 });
                }
            }
            cards[oldTargetOrder] = __assign(__assign({}, cards[oldTargetOrder]), { order: newTargetOrder });
            cards.sort(function (a, b) { return a.order - b.order; });
            Card.cardsSection.innerHTML = '';
            for (var i = 0, max = cards.length; i < max; i++) {
                Card.cardsSection.append(cards[i].node);
            }
        };
        (_a = Card.cardsSection) === null || _a === void 0 ? void 0 : _a.addEventListener('dragstart', function (event) {
            var target = event.target.closest('.card');
            if (!target)
                return;
            target.style.zIndex = '100';
            _this.dragTarget = target;
        });
        (_b = Card.cardsSection) === null || _b === void 0 ? void 0 : _b.addEventListener('dragend', function (event) {
            var target = event.target.closest('.card');
            if (target)
                target.style.zIndex = '0';
        });
        (_c = Card.cardsSection) === null || _c === void 0 ? void 0 : _c.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        (_d = Card.cardsSection) === null || _d === void 0 ? void 0 : _d.addEventListener('drop', function (event) {
            event.preventDefault();
            var target = event.target.closest('.card');
            target && _this.drop(target);
        });
    }
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
