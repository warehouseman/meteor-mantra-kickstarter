Feature: 001 Register a new user
  As an unauthorized user
  I want to join up

  @watch
  Scenario: Register a new user
    Given my email is "yourself.yourorg@gmail.com" and I have opened the registration page, "http://localhost:3000/register"
    When I enter my email and the repeated password : "yourpassword",
    Then I see the login page submit button : "Login".

  @watch
  Scenario: Login new user
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "yourself.yourorg@gmail.com" and password "yourpassword"
    And I submit the form
    Then I see my user drop-down menu.

  @watch
  Scenario: Logout new user
    Given I am at my personal account page, "http://localhost:3000/account"
    When I logout,
    Then I see the login page submit button : "Login".
