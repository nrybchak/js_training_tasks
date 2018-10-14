@about
Feature: About > Locations page

    Background:
        When I move mouse on "About" menu button
        And I click on "Locations" menu button

    @smoke
    Scenario: Verify that user is able to see correct page titles
        Then Locations Page title should have text "Exadel locations"

    @smoke
    Scenario: Verify Belarusian locations
        When I scroll to location "Belarus"
        Then Location cities from 2 to 7 should equal to these locations:
            | BREST |
            | GOMEL |
            | GRODNO |
            | MINSK |
            | VITEBSK |