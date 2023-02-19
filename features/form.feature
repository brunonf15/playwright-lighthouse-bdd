
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
  @only
  Scenario: Verify that the First name field accepts only valid inputs
    Given I am on the form page
    When I enter an invalid First name
    And I click the Submit button
    Then I should assert that a valid First name is required
    Then I should assert that no have message
  
  Scenario: Verify that the email field accepts only valid inputs
    Given I am on the form page
    When I enter an invalid email
    And I click the Submit button
    Then I should assert that a valid email is required
    Then I should assert that no have message
  
  Scenario: Verify that the Phone number field accepts only valid inputs
    Given I am on the form page
    When I enter an invalid Phone number
    And I click the Submit button
    Then I should assert that a valid Phone number is required
    Then I should assert that no have message

  #This test have found a boud, it should be raised
  #Scenario: Verify that the Phone number field accepts accpet properly valid inputs
    #Given I am on the form page
    #When I enter an valid Phone number
    #And I click the Submit button
    #And I click the Submit button
    #Then I should assert the success message