Feature: 003 User Management  
  As an authorized user
  I need to reset my password

  @watch
  Scenario: Request password reset
    Given I have opened the password reset page : "http://localhost:3000/password"
    When I provide my email "yourself.yourorg@gmail.com"
    And I submit the password change request form
    Then I see the confirmation: "Please check your email".
