# Battleships - a turn-based Vanilla JavaScript game | GA project 1
https://user-images.githubusercontent.com/96052888/159977037-638b484b-bb8d-4023-9e07-8e36b0c0f5e2.mov

In this implementation of [Battleships](https://en.wikipedia.org/wiki/Battleship_(game)), a single player can add their fleet of ships to a game board, randomly generate a ship layout for the computer, and then the player and computer alternate turns in firing at each other's boards - with hits show in red and misses in white. Once all ships on either board have been sunk, the game ends and a victor is declared.

The game has been deployed with GitHub Pages and is available [here](https://pete-livermore.github.io/battleships/).

Brief & timeframe
------
* Solo project
* Build a functioning browser game with pure JavaScript in 8 days.

Languages/tools used
------
* HTML5
* CSS3
* JavaScript
* GitHub

Game walkthrough
------

https://user-images.githubusercontent.com/96052888/162738028-fc766c33-3405-4eb6-addb-72f450d2691a.mp4

Once all ships of one of the boards have been sunk, the game is ended and a winner declared:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648148915/Habit_tracker_app/Screenshot_2022-03-24_at_19.02.31_ljk9iu.png "Logo Title Text 1")

The player can then reset the game by clicking the "Reset game" button

Planning
------
I started development by breaking down the game into well-defined features, and determined a priority for these ranging from essential for core game functionality, to ‘nice-to-have’. Once the MVP was established, I wireframed the UI so that I could visualise how the UI would change over the course of the game. I then ‘pseudocoded’ the individual features so that I could get a good idea of what would be involved, and what I would need to work on in which order, so that I could deliver the game in time, and allow time for polishing and styling.

Process
------
I created the game grid by establishing the grid width and grid size as variables. I then used these in a function that contains a for loop that adds child divs, giving each cell an id, and distinguishing cells in CPU and player grids by adding a separate class.

```javascript
const grids = document.querySelectorAll('.grid')
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
I decided to structure the computer and player ships as objects, so that they would have properties that could be modified throughout the game (and reset at the end):
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
  
 I determined ship placement by adding classes to the grid div e.g.
```javascript
  ...forEach(div => playerGrid[div.id].classList.add('used', playerShip.name))
```

A key element of the process was establishing ship placement. For this, I decided to use a directions key on the ship object, which is an array that essentially spans the ids that a particular ship type would cover, given the chosen direction of the ship. This allowed me to ensure that the ships can't be placed off the board or on a square that is already taken. The initial ‘adding’ of the ships occurs with an event listener that listens for a mouse hover event and then adds a hover class to relevant cells, and then the ship is permanently added using an event listener that runs a separate function to change the hovered cell classes in response to a user click.

```javascript
  function addPlayerShip(e) {
     let currentLocation
     const startLocation = parseFloat(e.target.id)
     if (playerShipRotation === 'Horizontal') {
        currentLocation = playerShip.directions[0]
     }
     if (playerShipRotation === 'Vertical') {
        currentLocation = playerShip.directions[1]
     }
     const isTaken = currentLocation.some(index => playerGrid[startLocation + index].classList.contains('used'))
     const atRightEdge = currentLocation.some(index => (startLocation + index) % gridWidth % gridWidth === gridWidth - 1)
     const atLeftEdge = currentLocation.some(index => (startLocation + index) % gridWidth % gridWidth === 0)
     if (!isTaken && (!atRightEdge || !atLeftEdge)) {
         currentLocation.forEach(index => {
             playerGrid[startLocation + index].classList.add('hover')
         })
     }
```

While the player can click on grid cells to add a ship, I decided that the CPU ship adding function needed to be random:

```javascript
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
```

The player fire function uses an event listener that listens for a click on the CPUs grid. I then assigned a hit or a miss to a ship using classes e.g.

```javascript
  if (e.target.classList.contains('used') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {
      e.target.classList.add('hit')
…
```

Key learnings
------
First and foremost, this project required me to get to grips with DOM manipulation - selecting the correct nodes, understanding what they represent in JS (e.g. NodeList) and learning how to alter them in the correct way and sequence. I learned a lot about query selectors and event listeners - what exactly they are doing with respect to the DOM and how to best use them to achieve event-based interactivity on the page.

More fundamentally though, it helped me to better understand JavaScript functions. Because the game has an order/flow, I used a number of nested functions, which improved my understanding of variable scope, and declaring vs calling functions.

Challenges
------
Because I used objects to store the data for the ships, I was initially a little confused by my reset function not 'resetting' the ship objects correctly. Through further reading, I was able to solve this, as I was introduced to object reference and spread syntax, which I ultimately went on to cover in lessons.

What I found most challenging, partly due to time constraints, was establishing a 'smart' CPU so that when the computer attacks the player's board, if it hits a ship, it tries to hit adjacent squares in all directions until it has established that the ship has been sunk. There was such a depth to this logic, with so many different scenarios, that it became impossible for me to complete this functionality in the given timeframe and so I had to resort to having the CPU make random attacks on the player's board.

Wins
------
I was quite proud of how I was able to control placement of the player's ships, without touching or overlapping, in tandem with the hover effect. Because this game involves placing a multi-square object on the grid, it took a reasonable amount of thought and recursion to 'add' ships to the board in only the available squares.

Future features
------
As mentioned above, I began work on smarter logic for the computer when firing at the player's board and I plan to finish this to make the game more enjoyable and challenging for the player. So far I mapped the logic and have begun translating that to JS in pseudocode.

Although the basic UI of the app is generally responsive, I would also like to improve the user experience on mobile. For example, the boards are currently stacked vertically on smaller screens, which works aesthetically but doesn't allow the user to see the full game situation.

Finally, since I am capturing hit data during the game, I would also like to add a scoreboard (ships hit/sunk etc) so that it is clearer what the current status of the game is.
