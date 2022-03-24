function init() {
  const grids = document.querySelectorAll('.grid')
  const gridWidth = 10
  const gridSize = gridWidth * gridWidth
  const cells = []
  const compShipButton = document.querySelector('.comp-ship')
  compShipButton.disabled = true
  const audio = document.getElementById('audio')

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
    {
      name: 'battleship',
      length: 4,
      hits: 0,
      sunk: false,
      used: 0,
      directions: [
        [0, 1, 2, 3],
        [0, gridWidth, gridWidth * 2, gridWidth * 3]
      ],
    },
    {
      name: 'destroyer',
      length: 3,
      hits: 0,
      sunk: false,
      used: 0,
      directions: [
        [0, 1, 2],
        [0, gridWidth, gridWidth * 2]
      ],
    },
    {
      name: 'submarine',
      length: 2,
      hits: 0,
      sunk: false,
      used: 0,
      directions: [
        [0, 1],
        [0, gridWidth]
      ],
    },
    {
      name: 'patrol',
      length: 2,
      hits: 0,
      sunk: false,
      used: 0,
      directions: [
        [0, 1],
        [0, gridWidth]
      ],
    }
  ]
  const startingCompShips = [
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, gridWidth, gridWidth * 2, gridWidth * 3, gridWidth * 4]
      ],
      hits: 0,
      sunk: false,
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, gridWidth, gridWidth * 2, gridWidth * 3]
      ],
      hits: 0,
      sunk: false,
    },
    {
      name: 'destroyer',
      directions: [
        [0, 1, 2],
        [0, gridWidth, gridWidth * 2]
      ],
      hits: 0,
      sunk: false,
    },
    {
      name: 'submarine',
      directions: [
        [0, 1],
        [0, gridWidth]
      ],
      hits: 0,
      sunk: false,
    },
    {
      name: 'patrol',
      directions: [
        [0, 1],
        [0, gridWidth]
      ],
      hits: 0,
      sunk: false,
    }
  ]

  let playerShips = []
  let compShips = startingCompShips.map(ship => ({ ...ship }))
  const rotationText = document.querySelector('#orientation-container')
  const shipChoice = document.querySelector('#ship-choice-container')
  const startButtonContainer = document.querySelector('#start-button-container')
  const controlButtonContainer = document.querySelector('#control-button-container')
  const rulesContainer = document.getElementById('rules-buttons')



  // Creating player and computer grids

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

  const playerGrid = document.querySelectorAll('.player')
  console.log(playerGrid)
  const compGrid = document.querySelectorAll('.computer')



  function rulesText() {
    const rulesHeader = document.createElement('p')
    rulesHeader.id = 'rules-text'
    const orderedList = document.createElement('ol')
    rulesContainer.prepend(rulesHeader, orderedList)

    const txtChoice = ['Welcome to battleships!', 'Here are the rules:']
    let textPosition = 0
    let quoteArray


    function addWelcomeText() {
      quoteArray = [txtChoice[0]]
      rulesHeader.innerHTML = quoteArray[0].substring(0, textPosition)
      if (textPosition++ !== quoteArray[0].length) {
        setTimeout(addWelcomeText, 100)
      }

    }
    addWelcomeText()

    function removeText() {
      rulesHeader.innerHTML = '<p></p>'
      textPosition = 0
      quoteArray = [txtChoice[1]]
      setTimeout(addRulesText, 200)
    }
    setTimeout(removeText, 2600)

    function addRulesText() {
      rulesHeader.innerHTML = quoteArray[0].substring(0, textPosition)
      if (textPosition++ !== quoteArray[0].length) {
        setTimeout(addRulesText, 100)
      }
    }

    let timesRun = 0
    const arr = ['Click "set up game"', 'Select your ships and place on grid', 'Generate the computers ships', 'Click "start game" and fire away!']
    let index = -1

    setTimeout(populateOrderedList, 5000)

    function populateOrderedList() {
      index++
      const listItem = orderedList.appendChild(document.createElement('li'))
      listItem.innerText = arr[index]
      console.log('times run =>', timesRun)
      // str = arr
      timesRun++
      const nIntervId = setTimeout(populateOrderedList, 1500)
      if (timesRun === 4) {
        window.clearTimeout(nIntervId)
      }
    }

    function hideButtons() {
      controlButtonContainer.style.display = 'none'
      setTimeout(generateButtons, 10500)
    }
    hideButtons()

    function generateButtons() {
      controlButtonContainer.style.display = 'block'
    }
  }
  rulesText()


  const setUpButton = controlButtonContainer.children[0]
  const startButton = controlButtonContainer.children[1]
  const resetButton = controlButtonContainer.children[2]
  resetButton.addEventListener('click', resetGame)


  // Function for reset button
  function resetGame() {
    setUpButton.disabled = false
    startButton.disabled = true
    compShipButton.disabled = true
    playerGrid.forEach(div => div.classList.remove('used', 'carrier', 'battleship', 'destroyer', 'submarine', 'patrol', 'hit', 'miss'))
    compGrid.forEach(div => div.classList.remove('used', 'carrier', 'battleship', 'destroyer', 'submarine', 'patrol', 'hit', 'miss', 'comp'))
    shipChoice.innerHTML = ''
    playerShips = startingPlayerShips.map(ship => ({ ...ship }))
    compShips = startingCompShips.map(ship => ({ ...ship }))
    audio.src = ''
  }

  function setUpGame(e) {
    playerShips = startingPlayerShips.map(ship => ({ ...ship }))
    e.target.disabled = true

    // Function for adding ship choice text and buttons
    function addshipChoice() {
      shipChoice.innerHTML = '<p>Choose your ship!</p><div id="ship-choice-buttons-container"><button class="ship-choice" value ="carrier">Aircraft carrier</button><button class="ship-choice" value="battleship">Battleship</button><button class="ship-choice" value="destroyer">Destroyer</button><button class="ship-choice" value="submarine">Submarine</button><button class="ship-choice" value="patrol">Patrol boat</button></div>'

      let playerShip
      let playerShipRotation = 'Horizontal'
      let shipSelectButton
      const shipButtons = document.querySelectorAll('.ship-choice')


      // Function for player to select ships
      function shipSelector(e) {
        const index = playerShips.findIndex(ship => ship.name === e.target.value)
        playerShip = playerShips[index]
        shipSelectButton = e.target
        shipSelectButton.id = 'clicked'
        shipButtons.forEach(btn => {
          if (btn.value !== shipSelectButton.value) {
            btn.disabled = true
          }
        })
        // This adds rotation text
        function addRotation() {
          rotationText.innerHTML = '<p>Select an orientation</p><button class="orientation" id="horizontal">Horizontal</button><button class="orientation" id="vertical">Vertical</button>'
        }
        addRotation()
        const rotationButtons = document.querySelectorAll('.orientation')

        // Function for select rotation of ship
        function selectRotation(e) {
          rotationButtons.forEach(btn => btn.classList.remove('selected-button'))
          playerShipRotation = e.target.innerText
          e.target.classList.add('selected-button')
          console.log('player ship', playerShip)
          console.log('rotation', playerShipRotation)

          // Function for allowing hover over cells to display potential placement of player ship
          function addPlayerShip(e) {
            let currentLocation
            const startLocation = parseFloat(e.target.id)
            if (playerShipRotation === 'Horizontal') {
              currentLocation = playerShip.directions[0]
            }
            if (playerShipRotation === 'Vertical') {
              currentLocation = playerShip.directions[1]
            }
            console.log(e.target.children)
            const isTaken = currentLocation.some(index => playerGrid[startLocation + index].classList.contains('used'))
            const atRightEdge = currentLocation.some(index => (startLocation + index) % gridWidth % gridWidth === gridWidth - 1)
            const atLeftEdge = currentLocation.some(index => (startLocation + index) % gridWidth % gridWidth === 0)
            if (!isTaken && (!atRightEdge || !atLeftEdge)) {
              currentLocation.forEach(index => {
                playerGrid[startLocation + index].classList.add('hover')
              })
            }
            // Function for removing hover over cells
            function mouseleave() {
              const hoveredCells = document.querySelectorAll('.hover')
              hoveredCells.forEach(item => item.classList.remove('hover'))
            }
            playerGrid.forEach(div => div.addEventListener('mouseleave', mouseleave))
          }
          playerGrid.forEach(div => div.addEventListener('mouseenter', addPlayerShip))

          // Function for placing the players ships on click
          function shipClick() {
            if (playerShip.used === 0) {
              const arr = Array.from(playerGrid)
              const newArr = arr.filter(div => div.classList.contains('hover'))
              newArr.forEach(div => playerGrid[div.id].classList.add('used', playerShip.name))
              audio.src = 'sounds/mixkit-video-game-mystery-alert-234.wav'
              audio.volume = 0.2
              audio.play()
              playerShip.used++
              shipButtons.forEach(btn => {
                if (btn.id !== 'clicked') {
                  btn.disabled = false
                }
              })
              shipSelectButton.classList.remove('selected-button')
              shipSelectButton.disabled = true
            }
            if (playerShips.every(ship => ship.used === 1)) {
              compShipButton.disabled = false
              shipChoice.innerHTML = ''
              rotationText.innerHTML = ''
            }
            playerGrid.forEach(div => div.removeEventListener('mouseenter', addPlayerShip))
            removeRotation()
            function removeRotation() {
              rotationText.innerHTML = ''
            }
          }
          playerGrid.forEach(div => div.addEventListener('click', shipClick))

        }
        rotationButtons.forEach(btn => btn.addEventListener('click', selectRotation))
      }
      shipButtons.forEach(btn => btn.addEventListener('click', shipSelector))

    }
    addshipChoice()




    // Function for randomly generating computers ships on board
    function addComputerShips() {
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
      compShipButton.disabled = true

    }

    compShipButton.addEventListener('click', addComputerShips)

  }

  setUpButton.addEventListener('click', setUpGame)

  // Function for starting game
  function startGame() {
    startButton.disabled = true
    startButtonContainer.innerHTML = ''


    // Hover function for crosshair and target background change on computers grid
    function targetMouseEnter(e) {
      e.target.style.cursor = 'crosshair'
      e.target.classList.add('target-hover')
      function targetMouseLeave(e) {
        e.target.classList.remove('target-hover')
        e.target.style.cursor = null
      }
      compGrid.forEach(div => div.addEventListener('mouseleave', targetMouseLeave))
    }
    compGrid.forEach(div => div.addEventListener('mouseenter', targetMouseEnter))



    // Click targeting function for player fire
    function fire(e) {
      if (e.target.classList.contains('used') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {
        e.target.classList.add('hit')
        const shipName = e.target.classList[1]
        const index = compShips.findIndex(ship => ship.name === shipName)
        compShips[index].hits++
        audio.src = 'sounds/mixkit-sea-mine-explosion-1184.wav'
        audio.volume = 0.2
        audio.play()
        startButtonContainer.innerHTML = `Computer ${compShips[index].name} is hit!`
        if (compShips[index].hits === compShips[index].directions[0].length) {
          compShips[index].sunk = true
          startButtonContainer.innerHTML = `Computer ${compShips[index].name} has been sunk!`
        }
      }
      if (!e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {
        e.target.classList.add('miss')
        startButtonContainer.innerHTML = 'Miss!'
        audio.src = 'sounds/Water_Splash_1.mp3'
        audio.volume = 0.2
        audio.play()
      }
      compGrid.forEach(div => div.removeEventListener('click', fire))

      // Check if all ships have been sunk
      const allPlayerSunk = compShips.every(ship => ship.sunk === true)
      if (allPlayerSunk === true) {
        startButtonContainer.innerHTML = 'All computer ships have been sunk! Player wins'
        compGrid.forEach(div => div.removeEventListener('mouseenter', targetMouseEnter))
      } else {
        setTimeout(compFire, 2000)
      }
    }
    compGrid.forEach(div => div.addEventListener('click', fire))



    // Function for the computer fire 
    function compFire() {
      const randomTarget = playerGrid[Math.floor(Math.random() * playerGrid.length)]
      if (randomTarget.classList.contains('used') && !randomTarget.classList.contains('targeted')) {
        randomTarget.classList.add('hit', 'targeted')
        const playerShipHit = randomTarget.classList[1]
        const index = playerShips.findIndex(ship => ship.name === playerShipHit)
        audio.src = 'sounds/mixkit-sea-mine-explosion-1184.wav'
        audio.volume = 0.2
        audio.play()
        playerShips[index].hits++
        shipChoice.innerHTML = `<p>Player ${playerShips[index].name} is hit!</p>`
        if (playerShips[index].hits === playerShips[index].length) {
          playerShips[index].sunk = true
          shipChoice.innerHTML = `<p>Player ${playerShips[index].name} has been sunk!</p>`
        }
      } else if (!randomTarget.classList.contains('used') && !randomTarget.classList.contains('targeted')) {
        randomTarget.classList.add('miss', 'targeted')
        shipChoice.innerHTML = '<p>Miss!</p>'
        audio.src = 'sounds/Water_Splash_1.mp3'
        audio.volume = 0.2
        audio.play()
      } else {
        compFire()
      }
      const allCompSunk = playerShips.every(ship => ship.sunk === true)
      compGrid.forEach(div => div.addEventListener('click', fire))
      if (allCompSunk === true) {
        shipChoice.innerHTML = '<p>All player ships have been sunk! Computer wins</p>'
        compGrid.forEach(div => div.removeEventListener('click', fire))
      }
    }



  }
  startButton.addEventListener('click', startGame)

}

window.addEventListener('DOMContentLoaded', init)












