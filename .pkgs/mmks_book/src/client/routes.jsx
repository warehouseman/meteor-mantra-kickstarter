import React from 'react';
import {mount} from 'react-mounter';

import Utils from '../utils';

import ListBooks from './containers/collection';
import ViewBook from './containers/single';
import AddBook from './containers/add';
import EditBook from './containers/edit';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(Utils.LayoutDefault);

  FlowRouter.route('/book/:_id', {
    name: '_books.booksView',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<ViewBook _id={_id}/>)
      });
    }
  });

  FlowRouter.route('/books', {
    name: '_books.booksList',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<ListBooks />)
      });
    }
  });

  FlowRouter.route('/books/add', {
    name: '_books.booksAdd',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<AddBook />)
      });
    }
  });

  FlowRouter.route('/book/:_id/edit', {
    name: '_books.booksEdit',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<EditBook _id={_id}/>)
      });
    }
  });

}
