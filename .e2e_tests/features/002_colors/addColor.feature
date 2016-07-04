Feature: 002 Manage colors
  As a visitor
  I want to update or create a new color

  @watch
  Scenario: Create a new color
    Given I have opened the colors editor page : "http://localhost:3000/colors/add"
    When I create a "Pink" item with text "Pink is the new Black",
    Then I see a new record with the same title and contents.

  @watch
  Scenario: Edit color
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to edit the "Pink" item.
    When I save the item with new content "Pink is the new ---> Orange!",
    Then I see the record with the new content.

  @watch
  Scenario: Hide color
    Given I have opened the colors list page : "http://localhost:3000/colors"
    And I have elected to "delete" the "Pink" item.
    Then I no longer see that record.
