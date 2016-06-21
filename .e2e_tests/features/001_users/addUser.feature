Feature: 001 Register a new user
  As an unauthorized user
  I want to join up

  @watch
  Scenario: Register a new user
    Given my email is "x.yz@x.yz" and I have opened the registration page, "http://localhost:3000/register"
    When I enter my email and the repeated password : "xyz_1234",
    Then I see the main page text : "This is the post title: 1".
