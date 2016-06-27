/* eslint-disable no-undef   */
/* eslint-disable no-console */

const cukeBtnSubmit = '//button[@data-cuke="save-color"]';
const cukeInpTitle = '//input[@data-cuke="title"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';

var title = '';
var content = '';
module.exports = function () {


  this.Given(/^I have opened the colors editor page : "([^"]*)"$/, function (arg1) {
    browser.url(arg1);
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

};
