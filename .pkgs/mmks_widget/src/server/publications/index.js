function init( _clsWidgets, _meteor, _check ) {
  return function () {
    Meteor.publish('_widgets.list', function () {
      const selector = {};
      const options = {
        fields: {_id: 1, title: 1},
        sort: {createdAt: -1},
        limit: 10
      };

      return _clsWidgets.find(selector, options);
    });

    Meteor.publish('_widgets.single', function (_id) {
      _check( _id, String);
      const selector = {_id};
      const response = _clsWidgets.find(selector);
      return response;
    });
  };
}

const Publications = {
  new: init,
};

export default Publications;
