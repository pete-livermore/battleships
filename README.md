# Battleships - a turn-based vanilla JavaScript game | GA project 1

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648136736/Habit_tracker_app/Screenshot_2022-03-24_at_15.45.15_ib8gdw.png "Battleships game")

In this implementation of [Battleships](https://en.wikipedia.org/wiki/Battleship_(game)), a single player can add their fleet of ships to a game board, randomly generate a ship layout for the computer, and then the player and computer alternate turns in firing at each other's boards - with hits show in red and misses in white. Once all ships on either board have been sunk, the game ends and a victor is declared.

The game has been deployed with GitHub Pages and is available [here](https://pete-livermore.github.io/battleships/)

Brief & timeframe
------
* Build a functioning browser game with pure JavaScript in 8 days.

Languages/tools used
------
* HTML5
* CSS3
* JavaScript
* GitHub

Game walkthrough
------

Code examples
------

How I worked
------

What I got from the project
------
### General points
I felt that this game was particularly 

The biggest challenge for me was around the computers. Firstly the ships need to be randomly placed, but without touching or overlapping, which requires a considerable amount of logic and recursion. Secondly when the computer attacks the player's board, if it hits a ship, it should try to hit adjacent squares in all directions until it has established that the ship has been sunk.

### Technical points
Logic for the computer

Future features
------
Smart logic for the computer
