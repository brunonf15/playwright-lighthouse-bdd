
Feature: Run Acessibility tests
  
  Scenario: I run the lighthouse to check acessibility of the page
    Given I run lighthouse on web-ui-playground and get the results
    #Sorry to make this on the same step