/* eslint-disable no-undef   */
/* eslint-disable no-console */

const btnSubmit = '//button[@class="btn btn-primary" and contains(., "Save")]';
const inpTitle = '//input[@class="form-control" and @name="title"]';
const inpContent = '//textarea[@class="form-control" and @name="content"]';

const h2Title = '//*[@id="react-root"]/div/div/div/div/div[2]/div/h2';
const spnContent = '//*[@id="react-root"]/div/div/div/div/div[2]/div/p/span[1]';

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
    browser.waitForEnabled( btnSubmit );
    browser.setValue(inpTitle, title);
    browser.setValue(inpContent, content);

    browser.click(btnSubmit);
    browser.waitForEnabled('//*[@id="react-root"]/div/div/div/div/div[2]/div/h2');

  });

  this.Then(/^I see a new record with the same title and contents\.$/, function () {
    expect(browser.getText(h2Title)).toEqual(title);
    expect(browser.getText(spnContent)).toEqual(content);
  });

};
