
Feature: Submit a form
  
  Scenario: Submit a valid form
    Given I am on the form page
    When I enter valid form data
    And I click the Submit button
    Then I should assert the success message
  
  Scenario: Verify that the user cannot submit an incomplete form
    Given I am on the form page
    When I enter incomplete form data
    And I click the Submit button
    Then I should assert that no have message