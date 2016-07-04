/* eslint-disable no-undef   */
/* eslint-disable no-console */

const cukeBtnSubmit = '//button[@data-cuke="save-color"]';
const cukeInpTitle = '//input[@data-cuke="title"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';

const cukeHrefEdit = '//a[@data-cuke="edit-color"]';

const cukeColorsList = '//ul[@data-cuke="colors-list"]';


var title = '';
var content = '';
module.exports = function () {

//   Scenario: Create a new color
// ------------------------------------------------------------------------
  this.Given(/^I have opened the colors editor page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 2000);
    browser.timeouts('page load', 2000);

    browser.url(_url);
    server.call('_colors.wipe');
  });

  this.When(/^I create a "([^"]*)" item with text "([^"]*)",$/, function (arg1, arg2) {

    title = arg1;
    content = arg2;
    browser.waitForEnabled( cukeBtnSubmit );
    browser.setValue(cukeInpTitle, title);
    browser.setValue(cukeInpContent, content);

    browser.click(cukeBtnSubmit);
    browser.waitForEnabled('//*[@id="react-root"]/div/div/div/div/div[2]/div/h2');

  });

  this.Then(/^I see a new record with the same title and contents\.$/, function () {
    expect(browser.getText(cukeTitle)).toEqual(title);
    expect(browser.getText(cukeContent)).toEqual(content);
  });

// =======================================================================


//   Scenario: Edit color
// ------------------------------------------------------------------------
  this.Given(/^I have opened the colors list page : "([^"]*)"$/, function (_url) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeoutsImplicitWait(1000);
    browser.url(_url);
  });

  let link = '';
  this.Given(/^I have elected to edit the "([^"]*)" item\.$/, function (_color) {
    link = '//a[@data-cuke="' + _color + '"]';
    browser.waitForEnabled( link );
    browser.click(link);
    browser.waitForEnabled( cukeHrefEdit );
    browser.click(cukeHrefEdit);
  });

  this.When(/^I save the item with new content "([^"]*)",$/, function (_content) {
    content = _content;
    browser.setValue(cukeInpContent, content);
    browser.click(cukeBtnSubmit);
    browser.waitForEnabled( cukeTitle );
  });

  this.Then(/^I see the record with the new content\.$/, function () {
    expect(browser.getText(cukeContent)).toEqual(content);
  });

// =======================================================================


//   Scenario: Hide color
// ------------------------------------------------------------------------
  this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _color) {
    link = '//a[@data-cuke="' + _color + '"]';
    browser.waitForEnabled( link );
    browser.click(link);
    let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-color"]';

    browser.waitForEnabled( cukeHrefCmd );
    browser.click( cukeHrefCmd );

  });

  this.Then(/^I no longer see that record\.$/, function () {
    browser.waitForEnabled( cukeColorsList );
    let item = browser.elements(link);
    expect(item.value.length).toEqual(0);
  });

};
