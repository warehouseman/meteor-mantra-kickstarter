/* eslint-disable no-undef   */
/* eslint-disable no-console */

const cukeInpEmail = '//input[@data-cuke="rst-email"]';
const cukeButtonSubmit = '//input[@data-cuke="submit-rst-email"]';

const urlLogout = 'http://localhost:3000/logout';
const cukeLogin = '//x-cuke[@id="login"]';


let email = '';
module.exports = function () {

//  Scenario: Request password reset
// ------------------------------------------------------------------------

//  I have opened the password reset page : "http://localhost:3000/password"
  this.Given(/^I have opened the password reset page : "([^"]*)"$/, function (urlPasswordReset) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 2000);
    browser.timeouts('page load', 10000);
    browser.url(urlLogout);
    browser.waitForVisible(cukeLogin);
    browser.url(urlPasswordReset);

    server.call('_users.removeByEmail', 'jj@gmail.com');
    browser.waitForEnabled(cukeInpEmail);

  });

  this.When(/^I provide my email "([^"]*)"$/, function (_email) {
    email = _email;
    browser.setValue(cukeInpEmail, email);
    console.log('For email : ', email);
  });

  this.When(/^I submit the password change request form$/, function () {
    browser.click(cukeButtonSubmit);
    console.log('Code for submit button');
  });

  this.Then(/^I see the confirmation: "([^"]*)"\.$/, function (_confirmation) {
    console.log('Confirmation : ', _confirmation);
  });

// =======================================================================

};
