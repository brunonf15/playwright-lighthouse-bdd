
Feature: Submit a form
  
  Scenario: Submit a valid form
    Given I am on the form page
    When I enter valid form data
    And I click the Submit button
    Then I should assert the success message
