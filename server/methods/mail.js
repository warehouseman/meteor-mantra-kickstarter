

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
import _lgr from '/lib/logging/server/serverLogger';
const Lgr = new _lgr( __filename, 'info' );

var auth = {
/* eslint-disable camelcase   */
  auth: {
    api_key: process.env.MAILGUN_KEY || Meteor.settings.MAILGUN_KEY,
    domain: Meteor.settings.MAILGUN_DOMAIN
  }
/* eslint-enable camelcase   */
};

let mailer = nodemailer.createTransport(mg(auth));

mailer.resetPassword = function resetPassword(_email, _id, _validator) {
  Lgr.a = 'mailer.resetPassword';

  const cfg = Meteor.settings.public.PASSWORD_RESET;
  const host = Meteor.settings.public.HOST_URI;

  mailer.sendMail({
    from: cfg.From,
    to: _email,
    subject: cfg.Subject,
    html: cfg.Html_1 + host + cfg.Route + _id + '-' + _validator + cfg.Html_2,
    text: cfg.Text_1 + host + cfg.Route + _id + '-' + _validator + cfg.Text_2,
  }, function (err, info) {
    if (err) {
      Lgr.error( '\n Mail send error : ' + err + '\n' );
    } else {
      Lgr.info( '\n Mail host response: ' + info.message + '\n' );
    }
  });
};

export default mailer;
