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
type OrderOfNode = {
  node: HTMLElement;
  order: number;
};

export default class Card implements CardMaker {
  private static cardsSection = document.querySelector('.cards');
  private cardId: number = 0;
  private dragTarget?: HTMLElement;
  constructor() {
    Card.cardsSection?.addEventListener('dragstart', (event: Event) => {
      const target = (event.target as HTMLElement).closest(
        '.card'
      ) as HTMLElement;

      if (!target) return;
      target.style.zIndex = '100';
      this.dragTarget = target;
    });
    Card.cardsSection?.addEventListener('dragend', (event: Event) => {
      const target = (event.target as HTMLElement).closest(
        '.card'
      ) as HTMLElement;

      if (target) target.style.zIndex = '0';
    });
    Card.cardsSection?.addEventListener('dragover', function (event) {
      event.preventDefault();
    });
    Card.cardsSection?.addEventListener('drop', (event: Event) => {
      event.preventDefault();
      const target = (event.target as HTMLElement).closest(
        '.card'
      ) as HTMLElement;

      target && this.drop(target);
    });
  }

  add = (data: FormData, contentType: ContentType) => {
    const card = document.createElement('article');
    card.setAttribute('class', 'card');
    card.setAttribute('draggable', 'true');

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
    card.append(content);
    card.append(desc);
    card.append(deleteButton);
    if (!Card.cardsSection)
      throw new Error('html tag of cards section has problem');
    Card.cardsSection.append(card);
  };

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

  private drop = (target: HTMLElement) => {
    if (!Card.cardsSection) throw new Error('no card section');

    const nodeList = Card.cardsSection.querySelectorAll('.card');
    if (!nodeList) return;

    let cards: OrderOfNode[] = [];
    let oldTargetOrder: number | null = null;
    let newTargetOrder: number | null = null;
    nodeList.forEach((v, i) => {
      if (v === this.dragTarget) oldTargetOrder = i;
      else if (v === target) newTargetOrder = i;
    });
    if (newTargetOrder === null || oldTargetOrder === null)
      throw new Error('there are no targets');

    if (newTargetOrder === nodeList.length) newTargetOrder++;
    for (let i = 0, max = nodeList.length; i < max; i++) {
      if (oldTargetOrder === newTargetOrder) return;
      else if (oldTargetOrder < newTargetOrder) {
        if (i > newTargetOrder)
          cards.push({ node: nodeList[i] as HTMLElement, order: i });
        else cards.push({ node: nodeList[i] as HTMLElement, order: i - 1 });
      } else {
        if (i < newTargetOrder)
          cards.push({ node: nodeList[i] as HTMLElement, order: i });
        else cards.push({ node: nodeList[i] as HTMLElement, order: i + 1 });
      }
    }
    cards[oldTargetOrder] = { ...cards[oldTargetOrder], order: newTargetOrder };
    cards.sort((a: OrderOfNode, b: OrderOfNode): number => a.order - b.order);

    Card.cardsSection.innerHTML = '';
    for (let i = 0, max = cards.length; i < max; i++) {
      Card.cardsSection.append(cards[i].node);
    }
  };
}
