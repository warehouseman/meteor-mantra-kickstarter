Feature: Manage widgets
  As a visitor
  I want to update or create a new widget

  @~watch
  Scenario: Open main page
    Given I have opened the main page : "http://localhost:3000/"
    Then I see the navigation header.

  @~watch
  Scenario: Log in as a staff member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "staff@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Create a new widget
    Given I have opened the 'add widgets' page : "http://localhost:3000/widgets/add"
    When I create a "22" millimetre "Bronze" item with text "Bronze Plaque",
    Then I see a new record with the same title, size and contents.

  @~watch
  Scenario: Verify field validation
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I have elected to edit the "Bronze" item,
    When I set 'Size' to "12"
    And I save the item,
    Then I see the size validation hint "Nope. 12 is too small, Bronze Minimum : 21".

  @~watch
  Scenario: Update widget
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I have elected to edit the "Bronze" item,
    When I set 'Size' to "42"
    And I save the item with new content "Bronze is the new ---> Information!",
    Then I see the record with the new content.

  @~watch
  Scenario: Fail to update widget
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I have elected to edit the "Bronze" item,
    When I save the item with new content "Bronze is the new ---> crap!",
    Then I see the message, "I knew it! You're to blame -- again! [ Remedy : cut the crap ]".

  @~watch
  Scenario: Fail to delete widget
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I choose to view the "Bronze" item,
    When I elect to delete the item,
    Then I see it is disabled.

  @~watch
  Scenario: Log in as a registered member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "registered@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Unable to update widget
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I choose to view the "Bronze" item,
    And I attempt to edit the item,
    Then I see it is disabled.

  @~watch
  Scenario: Forbidden to create a new widget
    Given I have opened the widgets editor page : "http://localhost:3000/widgets/add"
    Then I see the warning "You haven't been authorized to access this page."

  @~watch
  Scenario: Log in as a member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "member@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Create a new widget
    Given I have opened the 'add widgets' page : "http://localhost:3000/widgets/add"
    When I create a "32" millimetre "Silver" item with text "Silver Plaque",
    Then I see a new record with the same title, size and contents.

  @~watch
  Scenario: Unable to update widget
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I choose to view the "Silver" item,
    When I attempt to edit the item,
    Then I see it is disabled.

  @~watch
  Scenario: Log in as an administrator
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "administrator@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Hide widget
    Given I have opened the widgets list page : "http://localhost:3000/widgets"
    And I have elected to "delete" the "Silver" item.
    Then I no longer see that record.


  @~watch
  Scenario: Logout administrator
    Given I am at the user account page, "http://localhost:3000/account"
    When I logout,
    Then I see the login page submit button : "Login".
