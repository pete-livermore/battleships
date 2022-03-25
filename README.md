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

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.04_kwwzu1.png "Choose ship")

Once a rotation is selected, the player can hover over acceptable spaces to see where they can place the ship (bounded by edges of board):

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.09_rcna0i.png "Choose rotation")

When they click the board, the ship is placed:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.22_pt4nrj.png "Ship hover")

The player adds ships in any order, but cannot a place over another ship:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.40.33_krhhaw.png "Adding 2nd ship")

Once the player has added all their ships, the "Generate computer's ships" button appears. Clicking this, undisables the "Start game" button.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.41.00_ccv9ad.png "Generate CPU ships")

After clicking "Start game" the player can hover over the CPU's board to aim their strike. Clicking the square fires the missile.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.41.11_rxvqwv.png "Aim")

A miss is indicated with a white square, a hit with a red one:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.41.19_nam1e0.png "Miss")

When a square containing a ship is hit, the text indicated the hit ship:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148915/Habit_tracker_app/Screenshot_2022-03-24_at_18.14.42_dgd55y.png "Logo Title Text 1")

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
