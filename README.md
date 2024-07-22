This is crazy

- store gameboard as array -> inside gameboard object
- Players stored in objects
- object to control flow of game

[As little global code as possible]
    - Tuck as much code as possible in factories
    - for a single instance (gameboard, displayController, etc)
        - wrap factory inside IIFE
        - such that it cannot be reused to create more instances

- think carefully where each logic should reside

- complete game in console
    - logic to check when game is over
    - nothing about DOM, HTMl, CSS unless game works in console

- once game is working
    - create object to handle DOM
    - function to render contents of gameboard array on webpage
        - for now just fill gameboard array with "X"s and "O"s 

- function to add mark on spot with DOM by clicking
    - clicked box cannot be clicked again

- clean up interface
    - players put in names
    - include button to reset board
    - display element to show results when game ends

------------------------------------------------------------------
