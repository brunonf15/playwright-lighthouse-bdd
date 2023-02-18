
Feature: Submit a form
  
  Scenario: Submit a valid form
    Given I am on the form page
    When I enter valid form data
    And I click the Submit button
    Then I should see a success message

  #Scenario: Submit an incomplete form
    #Given I am on the form page
    #When I fill out the form with incomplete data
    #And I submit the form
    #Then I see an error message
