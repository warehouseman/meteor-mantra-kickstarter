Feature: 001 Add a new color
  As an authorized user
  I want to create a new color

  @watch
  Scenario: Create a new color
    Given I have opened the colors editor page : "http://localhost:3000/colors/add"
    When I create a "Pink" item with text "Pink is the new Black",
    Then I see a new record with the same title and contents.
