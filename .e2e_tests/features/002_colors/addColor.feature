Feature: 002 Manage colors
  As a visitor
  I want to update or create a new color

  @watch
  Scenario: Log in as a staff member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "staff@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @watch
  Scenario: Create a new color
    Given I have opened the 'add colors' page : "http://localhost:3000/colors/add"
    When I create a "22" years old "Pink" item with text "Pink is the new Black",
    Then I see a new record with the same title, age and contents.

  @watch
  Scenario: Verify field validation
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to edit the "Pink" item,
    When I set 'Age' to "12"
    And I save the item,
    Then I see the validation hint "Nope. 12 is too young, Pool Party Age : 21".

  @watch
  Scenario: Update color
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to edit the "Pink" item,
    When I set 'Age' to "42"
    And I save the item with new content "Pink is the new ---> Orange!",
    Then I see the record with the new content.

  @watch
  Scenario: Fail to update color
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to edit the "Pink" item,
    When I save the item with new content "Pink is the new ---> crap!",
    Then I see the message, "I knew it! It's YOUR fault -- again! [ Remedy : cut the crap ]".

  @watch
  Scenario: Log in as a registered member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "registered@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @watch
  Scenario: Update color
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to edit the "Pink" item,
    Then I see the warning "You haven't been authorized to access this page."

  @watch
  Scenario: Create a new color
    Given I have opened the colors editor page : "http://localhost:3000/colors/add"
    Then I see the warning "You haven't been authorized to access this page."

  @watch
  Scenario: Log in as a member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "member@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @watch
  Scenario: Hide color
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to "delete" the "Pink" item.
    Then I no longer see that color record.
