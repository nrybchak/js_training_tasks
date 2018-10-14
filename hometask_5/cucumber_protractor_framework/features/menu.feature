Feature: Header menu

    @smoke @outline
    Scenario Outline: Verify that user is able to see all menu items
        When I move mouse on "<Header>" menu button
        Then I see <Number of items> items of <Header>

        Examples:
            | Header | Number of items |
            | Solutions | 9 |
            | Industries | 5 |
            | Our Work | 6 |
            | About | 4 |
            | News | 3 |
