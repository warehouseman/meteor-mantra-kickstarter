function init( _clsBooks, _meteor, _check ) {
  return function () {
    Meteor.publish('_books.list', function () {
      const selector = {};
      const options = {
        fields: {_id: 1, title: 1},
        sort: {createdAt: -1},
        limit: 10
      };

      return _clsBooks.find(selector, options);
    });

    Meteor.publish('_books.single', function (_id) {
      _check( _id, String);
      const selector = {_id};
      const response = _clsBooks.find(selector);
      return response;
    });
  };
}

const Publications = {
  new: init,
};

export default Publications;
