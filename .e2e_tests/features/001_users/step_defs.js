/* eslint-disable no-undef   */
/* eslint-disable no-console */

const frmSubmit = '//form[@class="vertical m-t"]';

const inpEmail = '//input[@class="form-control" and @name="email"]';
const inpPwd1 = '//input[@class="form-control" and @name="password1"]';
const inpPwd2 = '//input[@class="form-control" and @name="password2"]';

const ulContent = '//*[@id="react-root"]/div/div/div/ul';
const liContent = '//*[@id="react-root"]/div/div/div/ul/li[1]/a';

const h2Login = '//*[@id="react-root"]/div/div/div/div/div[2]/div/h2';

const urlLogout = 'http://localhost:3000/logout';

var email = '';
var urlRegister = '';
var password = '';


module.exports = function () {

  this.Given(/^my email is "([^"]*)" and I have opened the registration page, "([^"]*)"$/,
  function (arg1, arg2) {
    email = arg1;
    urlRegister = arg2;

    browser.url(urlLogout);
    browser.waitForVisible(h2Login);
    browser.url(urlRegister);

    server.call('_users.removeByEmail', email);
    // console.log('My email is "' + email + '" ' +
      // 'and I have opened the registration page : "' + urlRegister + '".');
  });

  this.When(/^I enter my email and the repeated password : "([^"]*)",$/, function (arg1) {

    password = arg1;
//    console.log('I enter my email ' + email + 'and the repeated password : "' + password + '".');

    browser.waitForEnabled(frmSubmit);

    browser.setValue(inpEmail, email);
    browser.setValue(inpPwd1, password);
    browser.setValue(inpPwd2, password);

    browser.submitForm(frmSubmit);

  });

  this.Then(/^I see the main page text : "([^"]*)"\.$/, function (arg1) {

    let flag = arg1;
    browser.waitForExist(ulContent);
    // console.log('I see the main page text : ' + arg1 + '", same as "' + flag + '".');
    expect(browser.getText(liContent)).toEqual(flag);
  });

};
