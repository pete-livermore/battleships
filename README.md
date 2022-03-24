# Battleships - a turn-based vanilla JavaScript game | GA project 1
https://user-images.githubusercontent.com/96052888/159977037-638b484b-bb8d-4023-9e07-8e36b0c0f5e2.mov

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

Clicking "Set up game" allows the player to select a ship, and upon doing so can select a rotation
Inline-style: 
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.04_kwwzu1.png "Choose ship")

Once a rotation is selected, the player can hover over acceptable spaces to see where they can place the ship:

Inline-style: 
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.22_pt4nrj.png "Ship hover")

Inline-style: 
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.09_rcna0i.png "Choose rotation")



Can't add a ship 
Inline-style: 
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.33_krhhaw.png "Logo Title Text 1")

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

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
