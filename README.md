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

### Game set up
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

### Game start

After clicking "Start game" the player can hover over the CPU's board to aim their strike. Clicking the square fires the missile.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.41.11_rxvqwv.png "Aim")

A miss is indicated with a white square, a hit with a red one:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148916/Habit_tracker_app/Screenshot_2022-03-24_at_17.41.19_nam1e0.png "Miss")

When a square containing a ship is hit, the text indicated the hit ship:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148915/Habit_tracker_app/Screenshot_2022-03-24_at_18.14.42_dgd55y.png "Hit ship")

When a whole ship is sunk, this is indicated in the text too:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648210845/Habit_tracker_app/Screenshot_2022-03-25_at_12.20.31_h80tzl.png "Sunk ship")

Once all ships of one of the boards have been sunk, the game is ended and a winner declared:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148915/Habit_tracker_app/Screenshot_2022-03-24_at_19.02.31_ljk9iu.png "Logo Title Text 1")

The player can then reset the game by clicking the "Reset game" button


Code examples
------
A key element is that the player ships are objects, with properties that are modified throughout the game:

```javascript
const startingPlayerShips = [
    {
      name: 'carrier',
      length: 5,
      hits: 0,
      sunk: false,
      used: 0,
      directions: [
        [0, 1, 2, 3, 4],
        [0, gridWidth, gridWidth * 2, gridWidth * 3, gridWidth * 4]
      ],
    },
    ...
  ```

A ship is 'placed' by adding classes to the grid div e.g.

```javascript
...forEach(div => playerGrid[div.id].classList.add('used', playerShip.name))
  ```


Adding both player and CPU ships uses the directions key on the ship object, and ensures that the ships can't be placed off the board or on a square that is already taken.

```javascript
function addComputerShips() {
      document.querySelector('.comp-ship').disabled = true
      rotationText.innerHTML = ''
      function addShip(compShip) {
        const randomDirection = parseFloat(Math.floor(Math.random() * compShip.directions.length))
        const current = compShip.directions[randomDirection]
        let direction
        if (randomDirection === 0) {
          direction = 1
        }
        if (randomDirection === 1) {
          direction = 10
        }
        const randomStart = Math.abs(Math.floor(Math.random() * compGrid.length - (compShip.directions[0].length * direction)))
        const isTaken = current.some(index => compGrid[randomStart + index].classList.contains('used'))
        const atRightEdge = current.some(index => (randomStart + index) % gridWidth === gridWidth - 1)
        const atLeftEdge = current.some(index => (randomStart + index) % gridWidth === 0)
        if (!isTaken && (!atRightEdge || !atLeftEdge)) {
          current.forEach(index => {
            compGrid[randomStart + index].classList.add('used', compShip.name, 'comp')
          })
        } else {
          addShip(compShip)
        }
        startButton.disabled = false
      }
      compShips.forEach(ship => addShip(ship))
    }
  }
  ```
  A ship is hit or a miss is assigned, using classes e.g. 
  
  ```javascript
      if (e.target.classList.contains('used') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {
        e.target.classList.add('hit')
        ...
  ```

What I got from the project
------
First and foremost, this project required me to get to grips with DOM manipulation - selecting the correct nodes, understanding what they represent in JS (e.g. NodeList) and learning how to alter them in the correct way and sequence. I learned a lot about query selectors and event listeners - what exactly they are doing with respect to the DOM and how to best use them to achieve event-based interactivity on the page.

More fundamentally though, it helped me to better understand JavaScript functions. Because the game has an order/flow, I used a number of nested functions, which improved my understanding of variable scope, and declaring vs calling functions.

Because I used objects to store the data for the ships, I was initially a little confused by my reset function not 'resetting' the ship objects correctly. Through further reading, I was able to solve this, as I was introduced to object reference and spread syntax, which I ultimately went on to cover in lessons.

I was quite proud of how I was able to control placement of the player's ships, without touching or overlapping, in tandem with the hover effect. Because this game involves placing a multi-square object on the grid, it took a reasonable amount of thought and recursion to 'add' ships to the board in only the available squares. 

What I found most challenging, partly due to time constraints, was establishing a 'smart' CPU so that when the computer attacks the player's board, if it hits a ship, it tries to hit adjacent squares in all directions until it has established that the ship has been sunk. There was such a depth to this logic, with so many different scenarios, that it became impossible for me to complete this functionality in the given timeframe and so I had to resort to having the CPU make random attacks on the player's board.

Future features
------
As mentioned above, I began work on smarter logic for the computer when firing at the player's board and I plan to finish this to make the game more enjoyable and challenging for the player. So far I mapped the logic and have begun translating that to JS in pseudocode.

Although the basic UI of the app is generally responsive, I would also like to improve the user experience on mobile. For example, the boards are currently stacked vertically on smaller screens, which works aesthetically but doesn't allow the user to see the full game situation.

Finally, since I am capturing hit data during the game, I would also like to add a scoreboard (ships hit/sunk etc) so that it is clearer what the current status of the game is.
