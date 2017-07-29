import partner from './iriblu_partner';
import book from './iriblu_book';
import deliveryItems from './iriblu_deliveryitems';

const names = [ 'book', 'deliveryItems', 'partner' ];

const modules = { names, partner, book, deliveryItems, };

export default function () {
  return modules;
}
