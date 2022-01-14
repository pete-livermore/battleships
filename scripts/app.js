function init() {
  const grids = document.querySelectorAll('.grid')
  const gridWidth = 10
  const gridSize = gridWidth * gridWidth
  const cells = []
  const setUpButton = document.querySelector('#set-up')
  const startButton = document.querySelector('#start')
  startButton.disabled = true
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

  // Creating player and computer grids

  grids.forEach(div => {
    return createGrid(div)
  })

  function createGrid(grid) {
    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement('div')
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  let playerShips = []
  let compShips = startingCompShips.map(ship => ({ ...ship }))
  const playerGridItems = document.querySelectorAll('#player div')
  const compGridItems = document.querySelectorAll('#computer div')
  const rotationText = document.querySelector('#orientation-container')
  const shipChoice = document.querySelector('#ship-choice-container')
  const startButtonContainer = document.querySelector('#start-button-container')

  // Function for reset button
  const resetButton = document.querySelector('#reset')
  function resetGame() {
    setUpButton.disabled = false
    startButton.disabled = true
    compShipButton.disabled = true
    playerGridItems.forEach(div => div.classList.remove('used', 'carrier', 'battleship', 'destroyer', 'submarine', 'patrol', 'hit', 'miss'))
    compGridItems.forEach(div => div.classList.remove('used', 'carrier', 'battleship', 'destroyer', 'submarine', 'patrol', 'hit', 'miss', 'comp'))
    shipChoice.innerHTML = ''
    playerShips = startingPlayerShips.map(ship => ({ ...ship }))
    console.log('player ships =>', playerShips)
    console.log(startingPlayerShips)
    compShips = startingCompShips.map(ship => ({ ...ship }))
    console.log('cpu ships =>', compShips)
    audio.src = ''
  }
  resetButton.addEventListener('click', resetGame)

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

        addRotation()
        const rotationButtons = document.querySelectorAll('.orientation')
        function addRotation() {
          rotationText.innerHTML = '<p>Select an orientation</p><button class="orientation" id="horizontal">Horizontal</button><button class="orientation" id="vertical">Vertical</button>'
        }

        // Function for select rotation of ship
        function selectRotation(e) {
          rotationButtons.forEach(btn => btn.classList.remove('selected-button'))
          playerShipRotation = e.target.innerText
          e.target.classList.add('selected-button')

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
            const isTaken = currentLocation.some(index => playerGridItems[startLocation + index].classList.contains('used'))
            const atRightEdge = currentLocation.some(index => (startLocation + index) % gridWidth % gridWidth === gridWidth - 1)
            const atLeftEdge = currentLocation.some(index => (startLocation + index) % gridWidth % gridWidth === 0)
            if (!isTaken && (!atRightEdge || !atLeftEdge)) {
              currentLocation.forEach(index => {
                playerGridItems[startLocation + index].classList.add('hover')
              })
            }
            // Function for removing hover over cells
            function mouseleave() {
              const hoveredCells = document.querySelectorAll('.hover')
              hoveredCells.forEach(item => item.classList.remove('hover'))
            }
            playerGridItems.forEach(div => div.addEventListener('mouseleave', mouseleave))
          }
          playerGridItems.forEach(div => div.addEventListener('mouseenter', addPlayerShip))

          // Function for placing the players ships on click
          function shipClick() {
            if (playerShip.used === 0) {
              const arr = Array.from(playerGridItems)
              const newArr = arr.filter(div => div.classList.contains('hover'))
              newArr.forEach(div => playerGridItems[div.id].classList.add('used', playerShip.name))
              audio.src = 'sounds/mixkit-video-game-mystery-alert-234.wav'
              audio.volume = 0.2
              audio.play()
              playerShip.used++
              console.log('number of times ship used =>', playerShip.used)
              shipButtons.forEach(btn => {
                if (btn.id !== 'clicked') {
                  btn.disabled = false
                }
              })
              shipSelectButton.classList.remove('selected-button')
              shipSelectButton.disabled = true
            }
            if (playerShips.every(ship => ship.used === 1)) {
              console.log('all ships used!')
              console.log('is button disabled? =>', compShipButton.disabled)
              compShipButton.disabled = false
              shipChoice.innerHTML = ''
              rotationText.innerHTML = ''
            }
            playerGridItems.forEach(div => div.removeEventListener('mouseenter', addPlayerShip))
            removeRotation()
            function removeRotation() {
              rotationText.innerHTML = ''
            }
          }
          playerGridItems.forEach(div => div.addEventListener('click', shipClick))

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
        const randomStart = Math.abs(Math.floor(Math.random() * compGridItems.length - (compShip.directions[0].length * direction)))
        const isTaken = current.some(index => compGridItems[randomStart + index].classList.contains('used'))
        const atRightEdge = current.some(index => (randomStart + index) % gridWidth === gridWidth - 1)
        const atLeftEdge = current.some(index => (randomStart + index) % gridWidth === 0)

        if (!isTaken && (!atRightEdge || !atLeftEdge)) {
          current.forEach(index => {
            compGridItems[randomStart + index].classList.add('used', compShip.name, 'comp')
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
    const compGridItems = document.querySelectorAll('#computer div')
    startButtonContainer.innerHTML = ''


    // Hover function for crosshair and target background change on computers grid
    function targetMouseEnter(e) {
      e.target.style.cursor = 'crosshair'
      e.target.classList.add('target-hover')
      function targetMouseLeave(e) {
        e.target.classList.remove('target-hover')
        e.target.style.cursor = null
      }
      compGridItems.forEach(div => div.addEventListener('mouseleave', targetMouseLeave))
    }
    compGridItems.forEach(div => div.addEventListener('mouseenter', targetMouseEnter))



    // Click targeting function for player fire
    function fire(e) {
      if (e.target.classList.contains('used') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {
        e.target.classList.add('hit')
        const shipName = e.target.classList[1]
        const index = compShips.findIndex(ship => ship.name === shipName)
        compShips[index].hits++
        audio.src = '/sounds/mixkit-sea-mine-explosion-1184.wav'
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
      compGridItems.forEach(div => div.removeEventListener('click', fire))
      
      // Check if all ships have been sunk
      const allPlayerSunk = compShips.every(ship => ship.sunk === true)
      if (allPlayerSunk === true) {
        startButtonContainer.innerHTML = 'All computer ships have been sunk! Player wins'
        compGridItems.forEach(div => div.removeEventListener('mouseenter', targetMouseEnter))
      } else {
        setTimeout(compFire, 2000)
      }
    }
    compGridItems.forEach(div => div.addEventListener('click', fire))



    // Function for the computer fire 
    function compFire() {
      const randomTarget = playerGridItems[Math.floor(Math.random() * playerGridItems.length)]
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
        audio.src = '/sounds/Water_Splash_1.mp3'
        audio.volume = 0.2
        audio.play()
      } else {
        compFire()
      }
      const allCompSunk = playerShips.every(ship => ship.sunk === true)
      compGridItems.forEach(div => div.addEventListener('click', fire))
      if (allCompSunk === true) {
        shipChoice.innerHTML = '<p>All player ships have been sunk! Computer wins</p>'
        compGridItems.forEach(div => div.removeEventListener('click', fire))
      }
    }



  }
  startButton.addEventListener('click', startGame)

}

window.addEventListener('DOMContentLoaded', init)












