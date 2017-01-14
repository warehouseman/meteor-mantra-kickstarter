/* eslint-disable no-undef   */

const cukeBtnSubmit = '//button[@data-cuke="save-item"]';

const cukeInpAge = '//input[@data-cuke="age"]';
const cukeInpTitle = '//input[@data-cuke="title"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeAge = '//x-cuke[@id="age"]';
const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';

const cukeColorsList = '//ul[@data-cuke="colors-list"]';

const cukeInvalidAge = '//span[@class="help-block error-block"]';

let age = '';
let title = '';
let content = '';
module.exports = function () {

//   Scenario: Create a new color
// ------------------------------------------------------------------------
  this.Given(/^I have opened the 'add colors' page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 20000);
    browser.timeouts('page load', 20000);

    browser.url(_url);
    server.call('_colors.wipe');
  });

  this.When(/^I create a "([^"]*)" years old "([^"]*)" item with text "([^"]*)",$/,
    function (_age, _title, _content) {

      age = _age;
      title = _title;
      content = _content;

      browser.waitForEnabled( cukeBtnSubmit );
      browser.setValue(cukeInpTitle, title);
      browser.setValue(cukeInpAge, age);
      browser.setValue(cukeInpContent, content);

      browser.click(cukeBtnSubmit);

    });

  this.Then(/^I see a new record with the same title, age and contents\.$/, function () {
    expect(browser.getText(cukeAge)).toEqual(age + ' years old.');
    expect(browser.getText(cukeTitle)).toEqual(title);
    expect(browser.getText(cukeContent)).toEqual(content);
  });

// =======================================================================


//   Scenario: Verify field validation
// ------------------------------------------------------------------------
  this.Given(/^I have opened the colors list page : "([^"]*)"$/, function (_url) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeoutsImplicitWait(60000);
    browser.url(_url);
  });

/*
  let link = '';
  this.Given(/^I have elected to edit the "([^"]*)" item,$/, function (_color) {
    link = '//a[@data-cuke="' + _color + '"]';
    browser.waitForExist( link );
    browser.click(link);
    browser.waitForEnabled( cukeHrefEdit );
    browser.click(cukeHrefEdit);
  });
*/

  this.When(/^I set 'Age' to "([^"]*)"$/, function (_age) {
    browser.setValue(cukeInpAge, _age);
  });

  this.Then(/^I see the age validation hint "([^"]*)"\.$/, function (_message) {
    expect(browser.getText(cukeInvalidAge)).toEqual(_message);
  });

// =======================================================================


//   Scenario: Fail to delete color
// ------------------------------------------------------------------------

  let color = '';
  this.Given(/^I have elected to view the "([^"]*)" item,$/, function (_color) {
    color = _color;
    const cukeHrefColor = `//a[@data-cuke="${color}"]`;

    browser.waitForEnabled( cukeHrefColor );
    browser.click( cukeHrefColor );

  });

// =======================================================================




//   Scenario: Unable to update color
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

  this.Given(/^I have opened the colors editor page : "([^"]*)"$/, function (_url) {

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


//   Scenario: Hide item
// ------------------------------------------------------------------------
/*
  this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _item) {
    link = '//a[@data-cuke="' + _item + '"]';
    browser.waitForEnabled( link );
    browser.click(link);
    let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-item"]';

    browser.waitForEnabled( cukeHrefCmd );
    browser.click( cukeHrefCmd );

  });
*/

/*
  this.Then(/^I no longer see that color record\.$/, function () {
    browser.waitForEnabled( cukeColorsList );
    let item = browser.elements(link);
    expect(item.value.length).toEqual(0);
  });
*/
};
