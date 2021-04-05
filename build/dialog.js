var DeleteDialog = (function () {
    function DeleteDialog() {
        var _this = this;
        var _a, _b, _c;
        this.onDelete = function () { };
        (_a = DeleteDialog.cardsSection) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
            var target = event.target;
            if (target.dataset.type === 'delete') {
                DeleteDialog.open();
                _this.card = target.closest('.card');
            }
        });
        (_b = DeleteDialog.deleteButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            _this.card && _this.onDelete && _this.onDelete(_this.card);
            DeleteDialog.close();
        });
        (_c = DeleteDialog.cancelButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            DeleteDialog.close();
        });
    }
    DeleteDialog.prototype.setEventListener = function (onDelete) {
        this.onDelete = onDelete;
    };
    DeleteDialog.open = function () {
        if (DeleteDialog.dialog)
            DeleteDialog.dialog.classList.remove('hide');
    };
    DeleteDialog.close = function () {
        if (DeleteDialog.dialog)
            DeleteDialog.dialog.classList.add('hide');
    };
    DeleteDialog.cardsSection = document.querySelector('.cards');
    DeleteDialog.dialog = document.querySelector('.dialog-wrap--delete');
    DeleteDialog.deleteButton = document.querySelector('.alert--button__delete');
    DeleteDialog.cancelButton = document.querySelector('.alert--button__cancel');
    return DeleteDialog;
}());
export { DeleteDialog };
var InputDialog = (function () {
    function InputDialog() {
        var _this = this;
        var _a, _b, _c;
        this.onSubmit = function () { };
        (_a = InputDialog.actionButtons) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
            var target = event.target;
            if (!target)
                return;
            _this.setInputType(target);
            InputDialog.open();
        });
        (_b = InputDialog.form) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
            event.preventDefault();
            var data = InputDialog.getData();
            if (!data)
                return;
            _this.onSubmit && _this.onSubmit(data, _this.contentType);
            InputDialog.close();
            InputDialog.form.reset();
        });
        (_c = InputDialog.cancelButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            InputDialog.close();
        });
    }
    InputDialog.prototype.setEventListener = function (onSubmit) {
        this.onSubmit = onSubmit;
    };
    InputDialog.open = function () {
        if (InputDialog.dialog)
            InputDialog.dialog.classList.remove('hide');
    };
    InputDialog.close = function () {
        if (InputDialog.dialog)
            InputDialog.dialog.classList.add('hide');
    };
    InputDialog.prototype.setInputType = function (target) {
        if (!InputDialog.content || !InputDialog.contentType)
            throw new Error('html tag of content input field might be changed');
        InputDialog.content.innerHTML = '';
        var action = target.dataset.action;
        var label = document.createElement('label');
        var input = document.createElement('input');
        switch (action) {
            case 'image':
                label.innerText = 'Image URL';
                input.setAttribute('type', 'url');
                input.setAttribute('placeholder', 'url of the image');
                break;
            case 'video':
                label.innerText = 'Youtube URL';
                input.setAttribute('type', 'url');
                input.setAttribute('placeholder', 'url of the youtube video');
                break;
            case 'note':
                label.innerText = 'Note';
                input.setAttribute('type', 'text');
                input.setAttribute('placeholder', 'any kind of text');
                break;
            case 'todo':
                label.innerText = 'To Do List';
                input.setAttribute('type', 'text');
                input.setAttribute('placeholder', 'use comma to seperate each item');
                break;
            default:
                return;
        }
        this.contentType = action;
        label.setAttribute('for', 'input--content');
        input.setAttribute('id', 'input--content');
        InputDialog.content.append(label);
        InputDialog.content.append(input);
    };
    InputDialog.getData = function () {
        var titleNode = document.querySelector('#input--title');
        var descriptionNode = document.querySelector('#input--description');
        var contentNode = document.querySelector('#input--content');
        if (!titleNode || !descriptionNode || !contentNode)
            throw new Error('input nodes has problem');
        var title = titleNode.value;
        var description = descriptionNode.value;
        var content = contentNode.value;
        if (!title || !description || !content)
            return undefined;
        return {
            title: title,
            description: description,
            content: content,
        };
    };
    InputDialog.actionButtons = document.querySelector('.header__action-buttons');
    InputDialog.dialog = document.querySelector('.dialog-wrap--input');
    InputDialog.form = document.querySelector('.dialog--input');
    InputDialog.content = document.querySelector('.input.content');
    InputDialog.contentType = document.querySelector('.content__type');
    InputDialog.submitButton = document.querySelector('.input--button__submit');
    InputDialog.cancelButton = document.querySelector('.input--button__cancel');
    return InputDialog;
}());
export { InputDialog };
