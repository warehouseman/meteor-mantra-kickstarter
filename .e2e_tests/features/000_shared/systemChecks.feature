Feature: 000 Verify System Configuration
  As an system tester
  I want to see that the system is configured appropriately for these tests

  @watch
  Scenario: Are we running as a submodule or stand-alone
    Given that the kickstarter is running stand-alone
    And I have opened the main page : "http://localhost:3000/"
    Then the title in the top left is "Kickstarter" or something else
