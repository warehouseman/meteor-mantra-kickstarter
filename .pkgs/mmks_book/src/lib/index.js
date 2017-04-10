let Astronomy = null;
let Mongo = null;
function init(_mongo, _astronomy) {

  Astronomy = _astronomy;
  Mongo = _mongo;

  let mongoBook = new Mongo.Collection('mongoBooks');
  let astroBook = Astronomy.create({

    name: 'Book',
    collection: mongoBook,
    fields: {
      title: String,
      pages: Number,
      content: String,
    },
    helpers: {
      fullText() {
        var full = this.title + ' ' + this.content;
        return full;
      }
    },
    behaviors: {
      softremove: {
        // The field name with a flag for marking a document as removed.
        removedFieldName: 'removed',
        // A flag indicating if a 'removedAt' field should be present in a document.
        hasRemovedAtField: true,
        // The field name storing the removal date.
        removedAtFieldName: 'removedAt'
      }
    }

  });

  return { astroBook, mongoBook };

}

export const Book = {
  new: init,
};
