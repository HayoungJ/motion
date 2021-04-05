import { DeleteDialog, InputDialog } from './dialog';
import Card from './card';

const deleteDialog = new DeleteDialog();
const inputDialog = new InputDialog();
const card = new Card();

deleteDialog.setEventListener(card.delete);
inputDialog.setEventListener(card.add);
