Feature: 003 User Management
  As an authorized user
  I want to create, view, update and delete users

  @watch
  Scenario: Log in as administrator
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "administrator@example.com" and password "apple1"
    And I submit the form
    Then I see my user drop-down menu.

  @watch
  Scenario: Create a new user
    Given I have opened the create user page : "http://localhost:3000/users/add"
    When I provide the user's name "Jennifer",
    And her family name "Johnson",
    And her email "jj@gmail.com",
    And her password "jjjj7777",
    And her role "Staff",
    And I submit the new user form.
    Then her record shows the same data.
