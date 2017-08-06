import partner from './iriblu_partner';
import book from './iriblu_book';

import deliveryItem from './iriblu_deliveryitem';

const names = [
  'book',
  'partner',


  'deliveryItem',


];

const modules = {
  names,
  partner,
  book,


  deliveryItem,


};

export default function () {
  return modules;
}
