Feature: Manage books
  As a visitor
  I want to update or create a new book

  @watch
  Scenario: Open main page
    Given I have opened the main page : "http://localhost:3000/"
    Then I see the navigation header.

  @watch
  Scenario: Log in as a staff member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "staff@example.com" and password "okok"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Create a new book
    Given I have opened the 'add books' page : "http://localhost:3000/books/add"
    When I create a "122" page book, "Ringworld", by "Niven, Larry" with synopsis "Imagination on a vast scale",
    Then I see a new record with the same title, author, number of pages and contents.

  @watch
  Scenario: Verify field validation
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "Graphic Designer" item,
    When I set 'Number of Pages' to "55"
    And I submit the item,
    Then I see the number of pages validation hint "Pages count cannot be less than 60!".

  @watch
  Scenario: Update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "Graphic Designer" item,
    When I set 'Number of Pages' to "321"
    And I submit the item with new content "SciFi is the new ---> Religion!",
    Then I see the record with the new content.

  @watch
  Scenario: Update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "Graphic Designer" item,
    When I submit the item with new author "Chapman, Eugénie",
    Then I see the record with the new content.

  @watch
  Scenario: Fail to update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "Graphic Designer" item,
    When I submit the item with new content "SciFi is the new ---> crap!",
    Then I see the error message, "Net-nanny says, “Don't be wude! 'Cwap' is weewee weewee cwude.”!".

  @~watch
  Scenario: Fail to delete book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I decide to view the "Ringworld" book,
    When I elect to delete the item,
    Then I see it is disabled.

  @~watch
  Scenario: Log in as a registered member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "registered@example.com" and password "okok"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Unable to update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I decide to view the "Ringworld" book,
    And I attempt to edit the item,
    Then I see it is disabled.

  @~watch
  Scenario: Forbidden to create a new book
    Given I have opened the books editor page : "http://localhost:3000/books/add"
    Then I see the warning "You haven't been authorized to access this page."

  @~watch
  Scenario: Log in as a member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "member@example.com" and password "okok"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Create a new book
    Given I have opened the 'add books' page : "http://localhost:3000/books/add"
    When I create a "164" page book, "Tau Zero", by "Anderson, Poul" with synopsis "Yes! WE caused the Big Bang!",
    Then I see a new record with the same title, author, number of pages and contents.

  @~watch
  Scenario: Create a new book
    Given I have opened the 'add books' page : "http://localhost:3000/books/add"
    When I create a "239" page book, "The Ringworld Engineers", by "Niven, Larry" with synopsis "For a wheel good time.",
    And I have opened the books list page : "http://localhost:3000/books"
    Then I see the book "The Ringworld Engineers".

  @~watch
  Scenario: Unable to update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I decide to view the "Ringworld" book,
    When I attempt to edit the item,
    Then I see it is disabled.

  @~watch
  Scenario: Log in as an administrator
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "adm@ec.ec" and password "okok"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Hide book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to "delete" the "The Ringworld Engineers" item.
    Then I no longer see that record.

  @~watch
  Scenario: Hide another book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to "delete" the "Tau Zero" item.
    Then I no longer see that record.

  @watch
  Scenario: Logout administrator
    Given I am at the user account page, "http://localhost:3000/account"
    When I logout,
    Then I see the login page submit button : "Login".
