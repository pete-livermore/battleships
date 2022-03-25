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
Creating game grids:

```javascript
  const grids = document.querySelectorAll('.grid')
  const gridWidth = 10
  const gridSize = gridWidth * gridWidth
  const cells = []
```

```javascript
  function createGrid(grid, index) {
    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement('div')
      cell.id = i
      if (index < 1) cell.classList.add('player')
      else cell.classList.add('computer')
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  grids.forEach((div, index) => {
    return createGrid(div, index)
  })
```

Adding computer ships:

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

What I got from the project
------
### General points
I felt that this game was particularly 

The biggest challenge for me was around the computers. Firstly the ships need to be randomly placed, but without touching or overlapping, which requires a considerable amount of logic and recursion. Secondly when the computer attacks the player's board, if it hits a ship, it should try to hit adjacent squares in all directions until it has established that the ship has been sunk.

### Technical points
Logic for the computer

Future features
------
Smarter logic for the computer
