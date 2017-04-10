Feature: 005 Password Management
  As an authorized user
  I need to reset my password

  @~watch
  Scenario: BAD password reset request
    Given I have opened the password reset request page : "http://localhost:3000/password"
    When I provide my email "sleazebag@hotmail.com"
    And I submit the password change request form
    Then I see the rejection, "We can't find <" that email "> in our files. [ UNKNOWN EMAIL ]".

  @~watch
  Scenario: Request password reset
    Given I have opened the password reset request page : "http://localhost:3000/password"
    When I provide my email "yourself.yourorg@gmail.com"
    And I submit the password change request form
    Then I see the confirmation: "Your password reset request has been sent".

  @~watch
  Scenario: Process BAD password reset code
    Given that my email is "sleazebag@hotmail.com"
    When I open the password reset page : "http://localhost:3000/prrq/" with code : "hacker"
    Then I see the invalid password reset alert, "You are not authorized to change a password here".

  @~watch
  Scenario: Process GOOD password reset code
    Given that my email is "yourself.yourorg@gmail.com"
    When I open the password reset page : "http://localhost:3000/prrq/" with code : "?"
    And enter password "myNewPassword" twice and click 'Reset Password'
    And I provide my email and new password and submit the form
    Then I see the user drop-down menu.
