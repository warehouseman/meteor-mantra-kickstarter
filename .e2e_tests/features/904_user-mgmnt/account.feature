Feature: 004 User Management  
  As an authorized user
  I want to create, view, update and delete users

  @~watch
  Scenario: Log in as administrator
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "administrator@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Create a new user
    Given I have opened the create user page : "http://localhost:3000/users/add"
    And seen the title "Add new record"
    When I provide the user's name "Jenny",
    And family name "Jonson",
    And her email "jj@gmail.com",
    And her password "jjjj7777",
    And her role "Member",
    And I submit the create user form.
    Then her record shows the same data.

  @~watch
  Scenario: Edit an existing user
    Given I have opened the list of users : "http://localhost:3000/users"
    And I find and click the Edit button for user "jj@gmail.com",
    And I see the user "Edit" form,
    When I provide the user's name "Jennifer",
    And family name "Johnson",
    And her role "Staff",
    And I submit the edit user form.
    Then the record shows the same data.

  @~watch
  Scenario: Hide an existing user
    Given I have opened the list of users : "http://localhost:3000/users"
    And I find and click the Remove button for user "jj@gmail.com",
    Then I no longer see that user record.
