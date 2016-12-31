/* eslint-disable no-undef   */

const cukeFormSubmit = '//form[@data-cuke="register"]';

const cukeInpEmail = '//input[@data-cuke="email"]';
const cukeInpPwd1 = '//input[@data-cuke="password1"]';
const cukeInpPwd2 = '//input[@data-cuke="password2"]';


const cukeLogin = '//x-cuke[@id="login"]';

const cukeInpLogin = '//input[@data-cuke="login-button"]';

const urlLogout = 'http://localhost:3000/logout';

var email = '';
var urlRegister = '';
var password = '';


module.exports = function () {

  this.Given(/^my email is "([^"]*)" and I have opened the registration page, "([^"]*)"$/,
  function (arg1, arg2) {
    email = arg1;
    urlRegister = arg2;

    browser.setViewportSize({ width: 1024, height: 480 });
    // browser.timeoutsImplicitWait(2000);
    browser.timeouts('implicit', 10000);
    browser.timeouts('page load', 10000);
    browser.url(urlLogout);
    browser.waitForVisible(cukeLogin);
    browser.url(urlRegister);

    server.call('_users.removeByEmail', email);

  });

  this.When(/^I enter my email and the repeated password : "([^"]*)",$/, function (arg1) {

    password = arg1;

    browser.waitForEnabled(cukeFormSubmit);

    browser.setValue(cukeInpEmail, email);
    browser.setValue(cukeInpPwd1, password);
    browser.setValue(cukeInpPwd2, password);

    browser.submitForm(cukeFormSubmit);

  });

  this.Then(/^I see the login page submit button : "([^"]*)"\.$/, function (arg1) {

    let flag = arg1;

    // browser.saveScreenshot('LoginPge.png');
    browser.waitForExist(cukeLogin);

    expect(browser.getValue(cukeInpLogin)).toEqual(flag);

  });

  this.Given(/^I am at the user account page, "([^"]*)"$/, function (_urlAccount) {
    browser.url(_urlAccount);
  });

  this.When(/^I logout,$/, function () {
    browser.url(urlLogout);
  });


};
