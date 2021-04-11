import { DeleteDialog, InputDialog } from './dialog.js';
import Card from './card.js';

class App {
  private readonly deleteDialog: DeleteDialog;
  private readonly inputDialog: InputDialog;
  private readonly card: Card;
  constructor() {
    this.deleteDialog = new DeleteDialog();
    this.inputDialog = new InputDialog();
    this.card = new Card();

    this.deleteDialog.setEventListener(this.card.delete);
    this.inputDialog.setEventListener(this.card.add);
  }
}

new App();
