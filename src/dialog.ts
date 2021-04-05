interface Dialog {
  setEventListener: Function;
}

type FormData = {
  title: string;
  description: string;
  content: string;
};
type ContentType = 'image' | 'video' | 'note' | 'todo';

export class DeleteDialog implements Dialog {
  private static cardsSection = document.querySelector('.cards');
  private card?: Element | null;
  private static dialog = document.querySelector('.dialog-wrap--delete');
  private static deleteButton = document.querySelector(
    '.alert--button__delete'
  );
  private static cancelButton = document.querySelector(
    '.alert--button__cancel'
  );
  private onDelete: Function = () => {};

  constructor() {
    DeleteDialog.cardsSection?.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.type === 'delete') {
        DeleteDialog.open();
        this.card = target.closest('.card');
      }
    });
    DeleteDialog.deleteButton?.addEventListener('click', () => {
      this.card && this.onDelete && this.onDelete(this.card);
      DeleteDialog.close();
    });
    DeleteDialog.cancelButton?.addEventListener('click', () => {
      DeleteDialog.close();
    });
  }

  setEventListener(onDelete: Function) {
    this.onDelete = onDelete;
  }

  private static open() {
    if (DeleteDialog.dialog) DeleteDialog.dialog.classList.remove('hide');
  }

  private static close() {
    if (DeleteDialog.dialog) DeleteDialog.dialog.classList.add('hide');
  }
}

export class InputDialog implements Dialog {
  private static actionButtons = document.querySelector(
    '.header__action-buttons'
  );
  private static dialog = document.querySelector('.dialog-wrap--input');
  private static form = document.querySelector(
    '.dialog--input'
  ) as HTMLFormElement;
  private static content = document.querySelector('.input.content');
  private static contentType = document.querySelector(
    '.content__type'
  ) as HTMLElement;
  private static submitButton = document.querySelector(
    '.input--button__submit'
  );
  private static cancelButton = document.querySelector(
    '.input--button__cancel'
  );
  private onSubmit: Function = () => {};
  private contentType?: ContentType;

  constructor() {
    InputDialog.actionButtons?.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target) return;
      this.setInputType(target);
      InputDialog.open();
    });
    InputDialog.form?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const data = InputDialog.getData();
      if (!data) return;

      this.onSubmit && this.onSubmit(data, this.contentType);
      InputDialog.close();
      InputDialog.form.reset();
    });
    InputDialog.cancelButton?.addEventListener('click', () => {
      InputDialog.close();
    });
  }

  setEventListener(onSubmit: Function) {
    this.onSubmit = onSubmit;
  }

  private static open() {
    if (InputDialog.dialog) InputDialog.dialog.classList.remove('hide');
  }

  private static close() {
    if (InputDialog.dialog) InputDialog.dialog.classList.add('hide');
  }

  private setInputType(target: HTMLElement) {
    if (!InputDialog.content || !InputDialog.contentType)
      throw new Error('html tag of content input field might be changed');

    InputDialog.content.innerHTML = '';
    const action = target.dataset.action;
    const label = document.createElement('label');
    const input = document.createElement('input');
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
  }

  private static getData(): FormData | undefined {
    const titleNode = document.querySelector('#input--title');
    const descriptionNode = document.querySelector('#input--description');
    const contentNode = document.querySelector('#input--content');
    if (!titleNode || !descriptionNode || !contentNode)
      throw new Error('input nodes has problem');

    const title = (titleNode as HTMLInputElement).value;
    const description = (descriptionNode as HTMLInputElement).value;
    const content = (contentNode as HTMLInputElement).value;
    if (!title || !description || !content) return undefined;

    return {
      title,
      description,
      content,
    };
  }
}
