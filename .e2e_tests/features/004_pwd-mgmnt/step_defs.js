/* eslint-disable no-undef   */

const cukeInpEmail = '//input[@data-cuke="rst-email"]';
const cukeButtonSubmit = '//input[@data-cuke="submit-rst-email"]';

const urlLogout = 'http://localhost:3000/logout';
const cukeLogin = '//x-cuke[@id="login"]';

const cukeAlertBad = '//div[@data-cuke="bad-mailing"]';
const cukeAlertGood = '//x-cuke[@id="reset-success"]';

const cukePwd1 = '//input[@data-cuke="password1"]';
const cukePwd2 = '//input[@data-cuke="password2"]';

const cukeSaveNewPassword = '//input[@data-cuke="submit"]';

const cukeInpLoginEmail = '//input[@data-cuke="email"]';
const cukeInpPwd = '//input[@data-cuke="password"]';

const cukeFrmSubmit = '//form[@data-cuke="login"]';
const cukeAccountPage = '//x-cuke[@id="account-page"]';

const cukeAcctEmail = '//x-cuke[@id="acct-email"]';

const cukeBadContent = '//div[@data-cuke="bad-content"]';

let reqEmail = '';
module.exports = function () {

//  Scenario: BAD password reset request
// ------------------------------------------------------------------------

//  I have opened the password reset page : "http://localhost:3000/password"
  this.Given(/^I have opened the password reset request page : "([^"]*)"$/
    , function (_urlPasswordResetRequest) {

      browser.setViewportSize({ width: 1024, height: 480 });
      browser.url(urlLogout);
      browser.waitForVisible(cukeLogin);
      browser.url(_urlPasswordResetRequest);

      server.call('_users.removeByEmail', 'jj@gmail.com');
      browser.waitForEnabled(cukeInpEmail);

    });

  this.When(/^I provide my email "([^"]*)"$/, function (_email) {
    reqEmail = _email;
    browser.setValue(cukeInpEmail, reqEmail);
  });

  this.When(/^I submit the password change request form$/, function () {
    browser.click(cukeButtonSubmit);
  });

  this.Then(/^I see the rejection, "([^"]*)" that email "([^"]*)"\.$/,
    function (_rejectionA, _rejectionB) {
      expect(browser.element(cukeAlertBad)
        .getText())
        .toEqual(_rejectionA + reqEmail + _rejectionB);
    });

// =======================================================================


//  Scenario: GOOD request password reset
// ------------------------------------------------------------------------

  this.Then(/^I see the confirmation: "([^"]*)"\.$/,
    function (_confirmation) {

      browser.waitUntil(function () {
        return browser.isVisible(cukeAlertGood);
      }, 90000, 'done trying', 2500);

      expect(browser.isVisible(cukeAlertGood) ? _confirmation : 'confirmation message')
                                          .toBe(_confirmation);
    });

// db.users.update( { "emails.address" : "yourself.yourorg@gmail.com" },
//  { $addToSet: { "emails": { "address" : "m@n.o", "verifier": 777, "verified" : true } } } );
// db.users.update( { "emails.address" : "yourself.yourorg@gmail.com" },
//  { $set : { "emails.1.verifier": 4444  } } );

// =======================================================================


//  Scenarios:
//     Process BAD password reset code
//     Process GOOD password reset code
// ------------------------------------------------------------------------

  this.Given(/^that my email is "([^"]*)"$/, function (_email) {
    reqEmail = _email;
  });

  this.When(/^I open the password reset page : "([^"]*)" with code : "([^"]*)"$/
    , function (_urlPasswordReset, _codeReset) {

      let rstCode = _codeReset;
      browser.setViewportSize({ width: 1024, height: 480 });

      if ( rstCode === '?' ) {
        /*  Got to the database to find the code sent in the email. */
        let user = server.call('_users.findByEmail', reqEmail);
        let idx = user.emails.findIndex(element => element.address === reqEmail);
        rstCode = user.emails[idx].verifier;
        // console.log(' Found reset code : ', rstCode);
      }

      browser.url(_urlPasswordReset + rstCode);

    });

// =======================================================================


//  Scenario: Process GOOD password reset code
// ------------------------------------------------------------------------

  let myPwd = null;
  this.When(/^enter password "([^"]*)" twice and click 'Reset Password'$/
    , function (_pwd) {
      myPwd = _pwd;
      browser.setValue(cukePwd1, myPwd);
      browser.setValue(cukePwd2, myPwd);
      browser.click(cukeSaveNewPassword);
    });

  this.When(/^I provide my email and new password and submit the form$/, function () {
    browser.setValue(cukeInpLoginEmail, reqEmail);
    browser.setValue(cukeInpPwd, myPwd);
    browser.submitForm(cukeFrmSubmit);
    browser.waitForExist(cukeAccountPage);

  });


  this.Then(/^I see the user drop\-down menu\.$/, function () {
    let idAcct = browser.getText(cukeAcctEmail);
    expect(idAcct).toEqual(reqEmail);
  });

// =======================================================================


//  Scenario: Process BAD password reset code
// ------------------------------------------------------------------------

  this.Then(/^I see the invalid password reset alert, "([^"]*)"\.$/, function (rude) {
    const msg = browser.getText(cukeBadContent);
    expect( msg ).toEqual(rude);
  });

// =======================================================================


};
