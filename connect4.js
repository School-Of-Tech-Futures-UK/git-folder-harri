
let turn = 0

let winner = false
let player1 = "red"
let highScore = 42 - turn
var menu_tags = []

const nameInput = window.document.querySelector("#name")
nameInput.value = player1

let grid = [
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null]
]

function takeTurn(e) {
	playSound("countersound.wav")
	const id = e.target.id   // Element Board Space ID
	const colNum = id[8]
	turn++
	highScore = 42 - turn
	const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
	if (winner !== true) {
		if (lowestAvailableRow !== null) {
			

			if (player1 === "red") {
				grid[lowestAvailableRow][colNum - 1] = "red"
				document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = "red"
				player1 = "yellow"
			} else {
				grid[lowestAvailableRow][colNum - 1] = "yellow"
				document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = "yellow"
				player1 = "red"

			}
		}

		nameInput.value = player1
		winner = checkWinner(grid)
	
        
		if(winner === true) {
			playSound("victory.mp3")
			let winningPlayer
			if (turn % 2 == 1) {//counts turn so turn odd is red and even is yellow
				winningPlayer = "red"
			} else {
				winningPlayer = "yellow"
			}

			score(highScore, winningPlayer)
			// setTimeout(() => {
			//     fetchScore()
			// }, 5000);

			const showWinner = document.getElementById("showWinner")
			console.log(showWinner)
			showWinner.textContent = `${winningPlayer} wins!` //shows colour depending on turn
		} 

		if (turn === 42) {
			const showWinner = document.getElementById("showWinner")
			showWinner.textContent = "It's a tie! Press reset to continue."
		}
	}
}

function playSound(src){
	// From stackvoerflow: https://www.stackoverflow.com/questions/9419263/how-to-play-audio
	var audio = new Audio(src)
	audio.play()
}

function score(highScore, winningPlayer) { 
	document.getElementById("score").value = highScore
	fetch("http://localhost:3000/score", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			highScore,
			player: winningPlayer
		})
	})
}

function fetchScore() {
	fetch("http://localhost:3000/score", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}) 
		.then((response) => response.json())  
		.then((data) => {
			menu_tags.push(data)
			var table_data = menu_tags[0]
			var html
			table_data.forEach(function(e) {
				html += "<tr>" + "<td>" + e.score + "</td>" + 
								"<td>" + e.player + "</td>" + "</tr>"
			})
			document.getElementById("putHere").innerHTML = html

		})
}



function getLowestAvailableRowInColumn(columnNumber, grid) {
	for (let i = 5; i >= 0; i--) {
		if (grid[i][columnNumber - 1] === null) {
			return i
		}
	}
	return null
}

function resetGame() {
	console.log("reset game")
	for (let i of document.getElementsByClassName("col")) {
		i.style.removeProperty("background-color")
	}
    
	grid = [
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null]
	]

	player1 = "red"
	nameInput.value = player1
	const showWinner = document.getElementById("showWinner")
	showWinner.textContent = ""
	winner = false
	turn = 0
	highScore = 0
	//score(highScore)
}


function checkWinner(grid) {
	return checkDiagonalWinner(grid) || checkHorizontalWinner(grid) || checkVerticalWinner(grid)
}

function scanGridForWinner(grid, matchesPerRow=4) {
	// Scans a grid (array of arrays) for 4 matching non-null values.
	let winner = false
	grid.forEach(row => { // For each row in our board
		let startPosition = 0 
		let endPosition = 4 
		for (let i in range(matchesPerRow)) {
			let rowSlice = row.slice(startPosition, endPosition) // Scan the row for a match of 4
			if (checkWinCondition(rowSlice)) {
				winner = true
			}
			startPosition++
			endPosition++
		}
	})
	return winner
} 

let checkHorizontalWinner = scanGridForWinner

function checkVerticalWinner(grid) {
	// Checks a grid for a vertical 4 stack winner.
	let rotatedGrid = rotateGrid(grid)
	return scanGridForWinner(rotatedGrid, 3)
}

function rotateGrid(grid) {
	// Rotates a grid (array of arrays) on it's side, changing columns to rows and rows to columns.
	const rotatedGrid = [] // Create a container for the columns
	for (let i in range(grid[0].length)) { // For each column in our grid
		let column = []
		grid.forEach(row => {
			column.push(row[i])
		})
		rotatedGrid.push(column)  // Create an empty column inside of our columns container
	}
	return rotatedGrid
}

function checkDiagonalWinner(grid) {
	let winner = false
	let potentialVerticalPositions = 3
	let potentialHorizontalPositions = 4
	
	// For every available vertical 4x4 subgrid in our game board...
	for (let y in range(potentialVerticalPositions)) {
		y = Number(y)

		// For every available vertical 4x4 subgrid in our game board...
		for (let x in range(potentialHorizontalPositions)) {
			x = Number(x)

			// []
			//   []
			//     []
			//       []
			let leftSlice = [
				grid[y][x],
				grid[y + 1][x + 1],
				grid[y + 2][x + 2],
				grid[y + 3][x + 3],
			]



			//       []
			//     []
			//   []
			// []
			let rightSlice = [
				grid[y + 3][x + 0],         // 3 equals 4 in the context of indexing
				grid[y + 2][x + 1],
				grid[y + 1][x + 2],
				grid[y + 0][x + 3],
			]

			if (checkWinCondition(rightSlice) || checkWinCondition(leftSlice)) {
				winner = true
			}
		}
	}
	return winner
}


function checkWinCondition(arr) {
	// Checks an array of to see if it's a win condition on our connect 4 game
	// Returns true if all values are strings (aka not null) AND are the same.
	return allEqual(arr) && allString(arr)
}

function allEqual(slice) {
	// Check that all values in an array are the same
	return slice.every(value => value === slice[0])
}

function allString(arr) {
	// Check that all values in an array are strings
	return arr.every(value => typeof value === "string")
}


function range(num) {
	// Mimicks the Array function in Python
	// From stackoverflow: https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
	return [...Array(num).keys()]
}

module.exports = {
	takeTurn,
	fetchScore,
	resetGame
}
