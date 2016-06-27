/* eslint-disable no-undef   */
/* eslint-disable no-console */

// const cukeFrmSubmit = '//form[@class="vertical m-t"]';
const cukeFrmSubmit = '//form[@data-cuke="login"]';

const urlLogout = 'http://localhost:3000/logout';
const cukeLogin = '//x-cuke[@id="login"]';
const cukeInpEmail = '//input[@data-cuke="email"]';
const cukeInpPwd = '//input[@data-cuke="password"]';

const cukeAccountPage = '//x-cuke[@id="account-page"]';
const cukeAcctEmail = '//x-cuke[@id="acct-email"]';

const cukeUserAddPage = '//x-cuke[@id="formTitle"]';


const cukeInpName = '//input[@data-cuke="firstName"]';
const cukeInpFamilyName = '//input[@data-cuke="lastName"]';
const cukeInpPwd1 = '//input[@data-cuke="pword1"]';
const cukeInpPwd2 = '//input[@data-cuke="pword2"]';


const cukeButtonSave = '//button[@data-cuke="user-save"]';
const cukeUserRecord = '//x-cuke[@id="user-record"]';

const xCukeFirstName = '//x-cuke[@id="firstName"]';
const xCukeLastName = '//x-cuke[@id="lastName"]';
const xCukeEmail = '//x-cuke[@id="email"]';
const xCukeRole = '//x-cuke[@id="role"]';

let myEmail = '';
module.exports = function () {

  this.Given(/^I have opened the login page : "([^"]*)"$/, function (urlLogin) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.url(urlLogout);
    browser.waitForVisible(cukeLogin);
    browser.url(urlLogin);

    server.call('_users.removeByEmail', 'jj@gmail.com');

  });

  this.When(/^I provide my email "([^"]*)" and password "([^"]*)"$/, function (_email, _pwd) {
    myEmail = _email;
    browser.setValue(cukeInpEmail, myEmail);
    browser.setValue(cukeInpPwd, _pwd);
  });

  this.When(/^I submit the form$/, function () {
    browser.submitForm(cukeFrmSubmit);
    browser.waitForExist(cukeAccountPage);
  });

  this.Then(/^I see my user drop\-down menu\.$/, function () {
    let idAcct = browser.getText(cukeAcctEmail);
    expect(idAcct).toEqual(myEmail);
  });

  this.Given(/^I have opened the create user page : "([^"]*)"$/, function (urlCreateUser) {
    browser.url(urlCreateUser);
    browser.waitForExist(cukeUserAddPage);
  });

  let firstName = '';
  this.When(/^I provide the user's name "([^"]*)",$/, function (_firstname) {
    firstName = _firstname;
    browser.setValue(cukeInpName, firstName);
  });

  let lastName = '';
  this.When(/^her family name "([^"]*)",$/, function (_lastname) {
    lastName = _lastname;
    browser.setValue(cukeInpFamilyName, lastName);
  });

  let eMail = '';
  this.When(/^her email "([^"]*)",$/, function (_email) {
    eMail = _email;
    browser.setValue(cukeInpEmail, eMail);
  });

  this.When(/^her password "([^"]*)",$/, function (_passwd) {
    browser.setValue(cukeInpPwd1, _passwd);
    browser.setValue(cukeInpPwd2, _passwd);
  });

  let role = '';
  this.When(/^her role "([^"]*)",$/, function (_role) {
    role = _role;

    let cukeRadioRole = '//input[@data-cuke="role" and @value="' + role + '"]';
    browser.click(cukeRadioRole);

  });

  this.When(/^I submit the new user form\.$/, function () {
    browser.click(cukeButtonSave);
    browser.waitForExist(cukeUserRecord);
  });


  this.Then(/^her record shows the same data\.$/, function () {

    expect(browser.element(xCukeFirstName).getText()).toEqual(firstName);
    expect(browser.element(xCukeLastName).getText()).toEqual(lastName);
    expect(browser.element(xCukeEmail).getText()).toEqual(eMail);
    expect(browser.element(xCukeRole).getText()).toEqual(role);

  });

};
