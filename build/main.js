import { DeleteDialog, InputDialog } from './dialog.js';
import Card from './card.js';
var deleteDialog = new DeleteDialog();
var inputDialog = new InputDialog();
var card = new Card();
deleteDialog.setEventListener(card.delete);
inputDialog.setEventListener(card.add);
