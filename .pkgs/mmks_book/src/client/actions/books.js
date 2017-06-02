import { Utils } from '../index';
import { LOAD_BOOK_QUERY, LOAD_BOOKS_QUERY } from '../api/queriesBooks.js';

let Lgr = null;

export default {

  initialize() {
    Lgr = new Utils.Logger( __filename, 'warn' );
    Lgr.a = 'getLogger';
  },

  validate(_, model) {

    const details = [];

    let minPageCount = 60;
    if ( model.pages < minPageCount ) {
      details.push({
        name: 'pages',
        message: 'Pages count cannot be less than ' + minPageCount + '!'
      });
    }

    if ( model.content && model.content.includes('crap')) {
      details.push({
        name: 'content',
        message: 'Net-nanny says, “Don\'t be wude! \'Cwap\' is weewee weewee cwude.”!'
      });
    }

    if (details.length) {
      throw {details};         // eslint-disable-line no-throw-literal
    }

  },

  // log() {
  //   Lgr.a = 'getLogger';
  //   Lgr.error(' Testing!  ');
  //   return 'Logger initialized in child';
  // },

  // create
  create({ FlowRouter }, book, mutate) {
    Lgr.a = 'create';
    Lgr.info('Create book with :: ', book.title);
    console.log('Book.create.  With : ', book);        // eslint-disable-line no-console
    mutate({

      refetchQueries: [ {
        query: LOAD_BOOKS_QUERY,
        variables: { deletion: false, },
      } ],

      variables: {
        title: book.title,
        content: book.content,
        pages: book.pages,
        authorId: book.author,
        deletion: false
      }
    }).then(function (result) {
      FlowRouter.go('/book/' + result.data.createBook._id);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter}, book, mutate) {
    Lgr.a = 'update';
    console.log('Update book (data) : ', book);        // eslint-disable-line no-console
    console.log('Update book (_id) : ', book._id);        // eslint-disable-line no-console
    let idAuthor = book.author;
    if ( book.author._id ) { idAuthor = book.author._id; }
    mutate({
      variables: {
        id: book._id,
        title: book.title,
        content: book.content,
        pages: book.pages,
        authorId: idAuthor
      }
    }).then(function (result) {
      const { errors, data } = result;
      console.log('Update book result :: ', data); // eslint-disable-line no-console
      console.log('Update book errors :: ', errors); // eslint-disable-line no-console
      FlowRouter.go('/book/' + result.data.updateBook._id);
    }).catch((error) => {
      console.log('Book update error :: ', error); // eslint-disable-line no-console
    });
  },

  // hide
  hide({Meteor, LocalState, FlowRouter}, _id, mutate) {
    Lgr.a = 'hide';
    console.log('Hide book (_id) : ', _id);        // eslint-disable-line no-console
    mutate({

      refetchQueries: [ {
        query: LOAD_BOOK_QUERY,
        variables: { idBook: _id },
      }, {
        query: LOAD_BOOKS_QUERY,
        variables: { deletion: false },
      } ],

      variables: { id: _id, deletion: true },

    }).then(function (result) {
      const { errors, data } = result;
      console.log('Hide book result :: ', data); // eslint-disable-line no-console
      console.log('Hide book errors :: ', errors); // eslint-disable-line no-console
      FlowRouter.go('/books');
    }).catch((error) => {
      console.log('Book hide error :: ', error); // eslint-disable-line no-console
    });
  },

  // clearError
  clearErrors({LocalState}) {
    Lgr.a = 'clearErrors';
    Lgr.debug('clearing now');
    LocalState.set('_books.DELETE_ERROR', null);
    LocalState.set('_books.HIDE_ERROR', null);
    LocalState.set('_books.ADD_ERROR', null);
    LocalState.set('_books.UPDATE_ERROR', null);
    return;
  }

};
