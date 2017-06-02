/* eslint-disable no-undef   */

const cukeBtnSubmit = '//button[@data-cuke="save-item"]';

const cukeInpSize = '//input[@data-cuke="size"]';
const cukeInpTitle = '//input[@data-cuke="title"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeSize = '//x-cuke[@id="size"]';
const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';

/*
const cukeHrefEdit = '//a[@data-cuke="edit-ite"]';
const cukeHrefDelete = '//a[@data-cuke="delete-item"]';
*/

const cukeInvalidSize = '//span[@class="help-block error-block"]';

let size = '';
let title = '';
let content = '';
module.exports = function () {

//   Scenario: Create a new widget
// ------------------------------------------------------------------------
  this.Given(/^I have opened the 'add widgets' page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 60000);
    browser.timeouts('page load', 60000);

    browser.url(_url);
    server.call('_widgets.wipe');
  });

  this.When(/^I create a "([^"]*)" millimetre "([^"]*)" item with text "([^"]*)",$/,
    function (_size, _title, _content) {

      size = _size;
      title = _title;
      content = _content;

      browser.waitForEnabled( cukeBtnSubmit );
      browser.setValue(cukeInpTitle, title);
      browser.setValue(cukeInpSize, size);
      browser.setValue(cukeInpContent, content);

      browser.click(cukeBtnSubmit);

    });

  this.Then(/^I see a new record with the same title, size and contents\.$/, function () {
    expect(browser.getText(cukeSize)).toEqual(size + ' millimetres.');
    expect(browser.getText(cukeTitle)).toEqual(title);
    expect(browser.getText(cukeContent)).toEqual(content);
  });

// =======================================================================


//   Scenario: Verify field validation
// ------------------------------------------------------------------------
  this.Given(/^I have opened the widgets list page : "([^"]*)"$/, function (_url) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeoutsImplicitWait(1000);
    browser.url(_url);
  });

/*
  let link = '';
  this.Given(/^I choose to edit the "([^"]*)" item,$/, function (_widget) {
    link = '//a[@data-cuke="' + _widget + '"]';
    browser.waitForExist( link );
    browser.click(link);
    browser.waitForEnabled( cukeHrefEdit );
    browser.click(cukeHrefEdit);
  });
*/
  this.When(/^I set 'Size' to "([^"]*)"$/, function (_size) {
    browser.setValue(cukeInpSize, _size);
  });

  this.Then(/^I see the size validation hint "([^"]*)"\.$/, function (_message) {
    expect(browser.getText(cukeInvalidSize)).toEqual(_message);
  });

// =======================================================================


//   Scenario: Fail to delete widget
// ------------------------------------------------------------------------

  let widget = '';
  this.Given(/^I choose to view the "([^"]*)" item,$/, function (_widget) {
    widget = _widget;
    const cukeHrefWidget = `//a[@data-cuke="${widget}"]`;

    browser.waitForEnabled( cukeHrefWidget );
    browser.click( cukeHrefWidget );

  });

/*
  let href = null;
  this.When(/^I decide to delete the item,$/, function () {
    href = cukeHrefDelete;

    browser.waitForExist( href );

  });

  this.Then(/^I see it is disabled\.$/, function () {
    expect(browser.isEnabled( href )).toBe(true);
  });
*/

// =======================================================================




//   Scenario: Unable to update widget
// ------------------------------------------------------------------------

/*
  this.When(/^I attempt to edit the item,$/, function () {
    href = cukeHrefEdit;
    browser.waitForExist( href );
  });
*/

// =======================================================================




//   Scenario: Prohibited from add and from update
// ------------------------------------------------------------------------

  this.Given(/^I have opened the widgets editor page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 60000);
    browser.timeouts('page load', 60000);

    browser.url(_url);
  });

/*
  this.Then(/^I see the warning "([^"]*)"$/, function (_warning) {
    expect(_warning).toEqual(browser.getText(cukeWarning));
  });
*/
// =======================================================================


//   Scenario: Hide widget
// ------------------------------------------------------------------------
/*
  this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _widget) {
    link = '//a[@data-cuke="' + _widget + '"]';
    browser.waitForEnabled( link );
    browser.click(link);
    let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-widget"]';

    browser.waitForEnabled( cukeHrefCmd );
    browser.click( cukeHrefCmd );

  });
*/

/*
  this.Then(/^I no longer see that widget record\.$/, function () {
    browser.waitForEnabled( cukeWidgetsList );
    let item = browser.elements(link);
    expect(item.value.length).toEqual(0);
  });
*/
};
