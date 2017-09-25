/* eslint-disable no-undef   */

const LG = console.log; // eslint-disable-line no-console
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

const cukeDivSubmit = '//div[@data-cuke="save-item"]/input';
const cukeDivContent = '//div[@data-cuke="content"]/*/textarea';
const cukeErrorMessage = '//div[@data-cuke="errorMessage"]/*/div';

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

  this.Given(/^I have opened the main page : "([^"]*)"$/, function (urlMain) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 60000);
    browser.timeouts('page load', 60000);

    browser.url(urlMain);
    browser.waitForVisible(classBrand, 30000);
  });

  this.Given(/^that the kickstarter is running stand\-alone$/, function () {
    return true;
  });

  this.Then(/^the title in the top left is "([^"]*)" or something else$/, function (_brand) {
    let isSubmodule = server.call('system.isSubModule');
    LG('It is ' + isSubmodule + ' and we get ' + browser.getText(classBrand));
    if ( isSubmodule === 'Stand-alone') {
      expect(browser.getText(classBrand)).toEqual(_brand);
    } else {
      expect(browser.getText(classBrand)).not.toEqual(_brand);
    }
  });

  // Scenario: Log in as administrator
  // ------------------------------------------------------------------------


  this.Then(/^I see the login menu item\.$/, function () {
    browser.waitForVisible(cukeHrefLogin, 30000);
  });

  this.Then(/^I see the navigation header\.$/, function () {
    browser.waitForVisible(classBrand, 30000);
  });

  this.Given(/^I have opened the login page : "([^"]*)"$/, function (urlLogin) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.url(urlLogout);
    browser.waitForExist(cukeLogin, 30000);
    browser.url(urlLogin);

    server.call('_users.removeByEmail', 'jj@jmail.com');

    browser.waitForVisible(cukeHrefLogin, 30000);

  });

  this.When(/^I provide my email "([^"]*)" and password "([^"]*)"$/, function (_email, _pwd) {
    myEmail = _email;
    browser.setValue(cukeInpEmail, myEmail);
    browser.setValue(cukeInpPwd, _pwd);
  });

  this.When(/^I submit the form$/, function () {
    browser.submitForm(cukeFrmSubmit);
    browser.waitForExist(cukeAccountPage, 30000);
  });

  this.Then(/^I see my user drop\-down menu\.$/, function () {
    let idAcct = browser.getText(cukeAcctEmail);
    expect(idAcct).toEqual(myEmail);
  });

  this.When(/^I save the item,$/, function () {
    browser.click(cukeBtnSubmit);
  });

  this.When(/^I submit the item,$/, function () {
    browser.click(cukeDivSubmit);
  });

  this.When(/^I save the item with new content "([^"]*)",$/, function (_content) {
    content = _content;
    browser.setValue(cukeInpContent, content);
    browser.click(cukeBtnSubmit);
  });

  this.When(/^I submit the item with new content "([^"]*)",$/, function (_content) {
    content = _content;
    browser.setValue(cukeDivContent, content);
    browser.click(cukeDivSubmit);
  });

  this.Then(/^I see the record with the new content\.$/, function () {
    browser.waitForEnabled( cukeTitle, 30000 );
    expect(browser.getText(cukeContent)).toEqual(content);
  });

  this.Then(/^I see the message, "([^"]*)"\.$/, function (_msg) {
    browser.waitUntil(function () {
      return browser.getText(cukeBadContent).length > 0;
    }, 30000, 'expected text to be there after 5s');

    const msg = browser.getText(cukeBadContent);
    expect( msg ).toEqual(_msg);
  });

  this.Then(/^I see the error message, "([^"]*)"\.$/, function (_msg) {
    browser.waitUntil(function () {
      return browser.getText(cukeErrorMessage).length > 0;
    }, 30000, 'expected text to be there after 5s');

    const msg = browser.getText(cukeErrorMessage);
    expect( msg ).toEqual(_msg);

  });

  this.Given(/^I have elected to edit the "([^"]*)" item,$/, function (_item) {
    link = '//a[@data-cuke="' + _item + '"]';
    browser.waitForExist( link, 30000 );
    browser.click(link);
    browser.waitForEnabled( cukeHrefEdit, 30000 );
    browser.click(cukeHrefEdit);
  });


  this.When(/^I elect to delete the item,$/, function () {
    href = cukeHrefDelete;

    browser.waitForExist( href, 30000 );

  });

  this.Then(/^I see it is disabled\.$/, function () {
    expect(browser.isEnabled( href )).toBe(true);
  });

  this.When(/^I attempt to edit the item,$/, function () {
    href = cukeHrefEdit;
    browser.waitForExist( href, 30000 );
  });

  this.Then(/^I see the warning "([^"]*)"$/, function (_warning) {
    expect(_warning).toEqual(browser.getText(cukeWarning));
  });

  this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _item) {
    link = '//a[@data-cuke="' + _item + '"]';
    browser.waitForEnabled( link, 30000 );
    // browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
    browser.click(link);
    let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-item"]';
    browser.waitForEnabled( cukeHrefCmd, 30000 );
    browser.click( cukeHrefCmd );

  });

  this.Then(/^I no longer see that record\.$/, function () {
    // console.log("Waiting for ", cukeItemsList);
    browser.waitForEnabled( cukeItemsList, 15000 );
    browser.refresh();

    // console.log("Waiting for ", cukeItemsList);
    browser.waitForEnabled( cukeItemsList, 30000 );
    browser.timeouts('implicit', 1000);
    // browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
    // console.log("Getting ", link);
    let listItem = browser.elements(link);
    browser.waitUntil(function () {
    // console.log(link + ' still there?');
      // browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
      listItem = browser.elements(link);
      // console.log("Got list item ", listItem);
      // console.log("Got list item.value ", listItem.value);
      // console.log("Got list item.value.length ", listItem.value.length);
      return ( listItem.value.length < 1 );
    }, 30000, ' what the?', 2000);
    expect(listItem.value.length).toEqual(0);
  });

// =======================================================================

};
