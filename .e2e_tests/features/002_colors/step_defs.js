/* eslint-disable no-undef   */

const cukeBtnSubmit = '//button[@data-cuke="save-item"]';

const cukeInpAge = '//input[@data-cuke="age"]';
const cukeInpTitle = '//input[@data-cuke="title"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeAge = '//x-cuke[@id="age"]';
const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';

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





//   Scenario: Prohibited from add and from update
// ------------------------------------------------------------------------

  this.Given(/^I have opened the colors editor page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 60000);
    browser.timeouts('page load', 60000);

    browser.url(_url);
  });

};
