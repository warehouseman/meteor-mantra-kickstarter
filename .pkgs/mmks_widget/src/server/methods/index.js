/* eslint-disable no-console   */
function init( _clsWidgets, _dbWidgets, _context) {
  let { AccessControl, App, Meteor, check, _lgr } = _context;

  const Lgr = new _lgr( __filename, 'warn' );

  const module = 'widgets';

  return function () {
    Meteor.methods({

      '_widgets.add'(data, _id) {
        Lgr.a = '_widgets.add';
        const action = 'add';
        const ap = AccessControl.findAccessPoint( module, action, App.group );

        const authorized = Roles.userIsInRole(
          Meteor.userId(),
          ap.trusted,
          ap.group
        );

        Lgr.debug( 'User, ' + Meteor.userId() + ', wants to add a widget.');
        if ( authorized ) {
          check(data, {
            title: String,
            size: Number,
            content: String
          });
          check(_id, String);

          let widget = new _clsWidgets();
          widget._id = _id;

          widget.title = data.title;
          widget.content = data.content;
          widget.size = data.size;

          widget.createAt = new Date();

          Lgr.verbose(`\nSaving : ${JSON.stringify(widget)} \n`);
          widget.save();

          return;
        }

        Lgr.warn(`Unauthorized attempt to add a widget by user : ${Meteor.userId()}\n`);
        throw new Meteor.Error(
          ' UNAUTHORIZED ACCESS ATTEMPT',
          'You are not authorized for that action',
          'endpoint: server/methods/_widget.js');
      },

      '_widgets.update'(data, _id) {
        Lgr.a = '_widgets.update';
        const action = 'add';
        check(data, {
          title: String,
          size: Number,
          content: String
        });
        check(_id, String);

        const ap = AccessControl.findAccessPoint( module, action, App.group );
        const authorized = Roles.userIsInRole(
          Meteor.userId(),
          ap.trusted,
          ap.group
        );

        if ( authorized ) {
          let record = _clsWidgets.findOne(_id);
          record.fullText();

          const allowedFields = [ 'title', 'size', 'content' ];
          for (let key of allowedFields) {
            record[key] = data[key];
          }

          if ( record.content.includes('crap')) {
            throw new Meteor.Error(
              ' Remedy : cut the crap ',
              'I knew it! You\'re to blame -- again!',
              'Yup. When it\'s cwappy, it\'s wee wee, wee wee cwappy');
          }
          Lgr.verbose(`\nSaving : ${JSON.stringify(record)} \n`);
          record.save(allowedFields);

          return;
        }

        Lgr.verbose(`Unauthorized attempt to edit widget by user : ${Meteor.userId()}\n`);
        throw new Meteor.Error(
          ' UNAUTHORIZED ACCESS ATTEMPT',
          'You are not authorized for that action',
          'endpoint: server/methods/_widget.js');

      },

      '_widgets.delete'(_id) {
        check(_id, String);
        Lgr.a = '_widgets.delete';

        Lgr.info(`\nDeleting : ${JSON.stringify(record)}\n`);

        let record = _clsWidgets.findOne(_id);
        record.remove();
      },

      '_widgets.hide'(_id) {
        check(_id, String);
        Lgr.a = '_widgets.hide';

        let record = _clsWidgets.findOne(_id);
        record.softRemove();

        Lgr.info(`\nHidden : ${JSON.stringify(record)}\n`);

      },

      '_widgets.wipe'() {
        let result = _dbWidgets.remove({});
        return result;
      }
    });
  };
}

const Methods = {
  new: init,
};

export default Methods;
