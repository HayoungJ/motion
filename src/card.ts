interface CardMaker {
  add: Function;
  delete: Function;
}

type FormData = {
  title: string;
  description: string;
  content: string;
};
type ContentType = 'image' | 'video' | 'note' | 'todo';

export default class Card implements CardMaker {
  private static cardsSection = document.querySelector('.cards');
  constructor() {}

  add(data: FormData, contentType: ContentType) {
    const card = document.createElement('article');
    card.setAttribute('class', 'card');

    const title = document.createElement('span');
    title.setAttribute('class', 'card__title');
    title.innerText = data.title;

    const desc = document.createElement('span');
    desc.setAttribute('class', 'card__desc');
    desc.innerText = data.description;

    const content = document.createElement('span');
    content.setAttribute('class', 'card__content');
    switch (contentType) {
      case 'image':
        content.innerHTML = `<img src="${data.content}" />`;
        break;
      case 'video':
        const youtubeEmbed = Card.changeToEmbedLink(data.content);
        content.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${youtubeEmbed}"></iframe>
        `;
        break;
      case 'note':
        content.innerText = data.content;
        break;
      case 'todo':
        const todo = data.content.split(',');
        Card.makeToDoList(todo, content);
        break;
      default:
        throw new Error('unknown content type');
    }

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'card__delete');
    deleteButton.innerHTML = `<i class="fas fa-minus-circle" data-type="delete"></i>`;

    card.append(title);
    card.append(desc);
    card.append(content);
    card.append(deleteButton);
    if (!Card.cardsSection)
      throw new Error('html tag of cards section has problem');
    Card.cardsSection.append(card);
  }

  delete(card: Element) {
    card.remove();
  }

  private static changeToEmbedLink(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  private static makeToDoList(todo: string[], content: HTMLSpanElement) {
    for (const ele of todo) {
      const item = document.createElement('span');
      item.setAttribute('class', 'content__todo');
      item.innerHTML = `
      <input type="checkbox" class="content__todo__checkbox" />
      <span>${ele}</span>
      `;
      content.append(item);
    }
  }
}
