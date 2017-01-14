/* eslint-disable no-undef   */

const cukeFrmSubmit = '//form[@data-cuke="login"]';

const urlLogout = 'http://localhost:3000/logout';
const cukeLogin = '//x-cuke[@id="login"]';

const cukeHrefLogin = '//a[@data-cuke="user-control-login"]';
const classBrand = '//a[@class="navbar-brand"]';

const cukeInpEmail = '//input[@data-cuke="email"]';
const cukeInpPwd = '//input[@data-cuke="password"]';

const cukeAccountPage = '//x-cuke[@id="account-page"]';
const cukeAcctEmail = '//x-cuke[@id="acct-email"]';

const cukeBtnSubmit = '//button[@data-cuke="save-item"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';
const cukeBadContent = '//div[@data-cuke="bad-content"]';

const cukeHrefEdit = '//a[@data-cuke="edit-item"]';
const cukeHrefDelete = '//a[@data-cuke="delete-item"]';

const cukeWarning = '//x-cuke[@id="warning"]';

const cukeItemsList = '//ul[@data-cuke="items-list"]';

// const cukeInpName = '//input[@data-cuke="firstName"]';
// const cukeInpFamilyName = '//input[@data-cuke="lastName"]';
// const cukeInpPwd1 = '//input[@data-cuke="pword1"]';
// const cukeInpPwd2 = '//input[@data-cuke="pword2"]';


// const cukeButtonSave = '//button[@data-cuke="user-save"]';
// const cukeUserRecord = '//x-cuke[@id="user-record"]';

// const xCukeFirstName = '//x-cuke[@id="firstName"]';
// const xCukeLastName = '//x-cuke[@id="lastName"]';
// const xCukeEmail = '//x-cuke[@id="email"]';
// const xCukeRole = '//x-cuke[@id="role"]';

// const cukeUserListPage = '//x-cuke[@id="user-list"]';

let myEmail = '';
let content = '';
let href = null;
let link = '';

module.exports = function () {

//  Scenario: Log in as administrator
// ------------------------------------------------------------------------


  this.Given(/^I have opened the main page : "([^"]*)"$/, function (urlMain) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 60000);
    browser.timeouts('page load', 60000);

    browser.url(urlMain);
    browser.waitForVisible(classBrand);
  });

  this.Then(/^I see the login menu item\.$/, function () {
    browser.waitForVisible(cukeHrefLogin);
  });

  this.Then(/^I see the navigation header\.$/, function () {
    browser.waitForVisible(classBrand);
  });

  this.Given(/^I have opened the login page : "([^"]*)"$/, function (urlLogin) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.url(urlLogout);
    browser.waitForExist(cukeLogin);
    browser.url(urlLogin);

    server.call('_users.removeByEmail', 'jj@gmail.com');

    browser.waitForVisible(cukeHrefLogin);

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

  this.When(/^I save the item,$/, function () {
    browser.click(cukeBtnSubmit);
  });

  this.When(/^I save the item with new content "([^"]*)",$/, function (_content) {
    content = _content;
    browser.setValue(cukeInpContent, content);
    browser.click(cukeBtnSubmit);
  });

  this.Then(/^I see the record with the new content\.$/, function () {
    browser.waitForEnabled( cukeTitle );
    expect(browser.getText(cukeContent)).toEqual(content);
  });

  this.Then(/^I see the message, "([^"]*)"\.$/, function (_msg) {
    browser.waitUntil(function () {
      return browser.getText(cukeBadContent).length > 0;
    }, 5000, 'expected text to be there after 5s');

    const msg = browser.getText(cukeBadContent);
    expect( msg ).toEqual(_msg);
  });

  this.Given(/^I have elected to edit the "([^"]*)" item,$/, function (_item) {
    link = '//a[@data-cuke="' + _item + '"]';
    browser.waitForExist( link );
    browser.click(link);
    browser.waitForEnabled( cukeHrefEdit );
    browser.click(cukeHrefEdit);
  });


  this.When(/^I elect to delete the item,$/, function () {
    href = cukeHrefDelete;

    browser.waitForExist( href );

  });

  this.Then(/^I see it is disabled\.$/, function () {
    expect(browser.isEnabled( href )).toBe(true);
  });

  this.When(/^I attempt to edit the item,$/, function () {
    href = cukeHrefEdit;
    browser.waitForExist( href );
  });

  this.Then(/^I see the warning "([^"]*)"$/, function (_warning) {
    expect(_warning).toEqual(browser.getText(cukeWarning));
  });

  let cnt = 0;
//  let itm = '';
  this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _item) {
//    itm = _item;
    link = '//a[@data-cuke="' + _item + '"]';
    browser.waitForEnabled( link );
//    browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
    browser.click(link);
    let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-item"]';
    browser.waitForEnabled( cukeHrefCmd );
    browser.click( cukeHrefCmd );

  });

  this.Then(/^I no longer see that record\.$/, function () {
// console.log("Waiting for ", cukeItemsList);
    browser.waitForEnabled( cukeItemsList );
    browser.timeouts('implicit', 1000);
//    browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
// console.log("Getting " + link);
    let listItem = browser.elements(link);
    browser.waitUntil(function () {
// console.log(link + ' still there?');
//      browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
      listItem = browser.elements(link);
// console.log("Got list item" + listItem);
// console.log("Got list item.value " + listItem.value);
// console.log("Got list item.value.length " + listItem.value.length);
      return 1 > listItem.value.length;
    }, 10000, ' what the?', 2000);
    expect(listItem.value.length).toEqual(0);
  });

// =======================================================================



};
