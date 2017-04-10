/* eslint-disable no-undef   */

const cukeBtnSubmit = '//div[@data-cuke="save-item"]/*[1]';
const cukeDivSubmit = '//div[@data-cuke="save-item"]/input';

const cukeInpTitle = '//div[@data-cuke="title"]/*/input';
const cukeInpNumPages = '//div[@data-cuke="pages"]/*/input';
const cukeInpAuthor = '//div[@data-cuke="author"]/*/select';
const cukeInpContent = '//div[@data-cuke="content"]/*/textarea';

const cukeNumPages = '//x-cuke[@id="pages"]';
const cukeTitle = '//x-cuke[@id="title"]';
const cukeAuthor = '//x-cuke[@id="author"]';
const cukeContent = '//x-cuke[@id="content"]';

const cukeErrorMessage = '//div[@data-cuke="errorMessage"]/*/div';

let pages = '';
let author = '';
let title = '';
let content = '';
module.exports = function () {

//   Scenario: Create a new book
// ------------------------------------------------------------------------
  this.Given(/^I have opened the 'add books' page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 20000);
    browser.timeouts('page load', 20000);

    browser.url(_url);
    server.call('_books.wipe');
  });

  this.When(/^I create a "([^"]*)" page book, "([^"]*)", by "([^"]*)" with synopsis "([^"]*)",$/,
    function (_pages, _title, _author, _content) {

      title = _title;
      author = _author;
      pages = _pages;
      content = _content;

      browser.waitForEnabled( cukeDivSubmit );
      browser.setValue(cukeInpTitle, title);

      var selectBox = browser.$(cukeInpAuthor);
      selectBox.selectByVisibleText(author);

      browser.setValue(cukeInpNumPages, pages);

      browser.setValue(cukeInpContent, content);

      browser.click(cukeBtnSubmit);

    });

  this.Then(/^I see a new record with the same title, author, number of pages and contents\.$/,
    function () {
      expect(browser.getText(cukeNumPages)).toEqual(pages);
      expect(browser.getText(cukeAuthor)).toEqual(author);
      expect(browser.getText(cukeTitle)).toEqual(title);
      expect(browser.getText(cukeContent)).toEqual(content);
    }
  );

// =======================================================================


//   Scenario: Verify field validation
// ------------------------------------------------------------------------
  this.Given(/^I have opened the books list page : "([^"]*)"$/, function (_url) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeoutsImplicitWait(1000);
    browser.url(_url);
  });

  this.When(/^I set 'Number of Pages' to "([^"]*)"$/, function (_pages) {
    browser.setValue(cukeInpNumPages, _pages);
  });

  this.Then(/^I see the number of pages validation hint "([^"]*)"\.$/, function (_message) {
    expect(browser.getText(cukeErrorMessage)).toEqual(_message);
  });

// =======================================================================

  let link = '';
  this.Then(/^I see the book "([^"]*)"\.$/, function ( _item ) {
    link = '//a[@data-cuke="' + _item + '"]';
    browser.waitForExist( link );
    expect(browser.getText(link)).toEqual(_item);
  });

  let book = '';
  this.Given(/^I decide to view the "([^"]*)" book,$/, function (_book) {
    book = _book;
    const cukeHrefBook = `//a[@data-cuke="${book}"]`;

    browser.waitForEnabled( cukeHrefBook );
    browser.click( cukeHrefBook );

  });

//   Scenario: Prohibited from add and from update
// ------------------------------------------------------------------------

  this.Given(/^I have opened the books editor page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 30000);
    browser.timeouts('page load', 30000);

    browser.url(_url);
  });

};
