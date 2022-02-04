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

function checkWinCondition(arr) {
	// Checks an array of to see if it's a win condition on our connect 4 game
	// Returns true if all values are strings (aka not null) AND are the same.
	return allEqual(arr) && allString(arr)
}

function checkHorizontalWinner(grid, matchesPerRow=4) {
	// Scans a grid (array of arrays) for 4 matching non-null values.
	let winner = false
	grid.forEach(row => { // For each row in our board
		let startPosition = 0 
		let endPosition = 4 
		//for (let x in range(matchesPerRow)) {
			let rowSlice = row.slice(startPosition, endPosition) // Scan the row for a match of 4
			if (checkWinCondition(rowSlice)) {
				winner = true
			//}
			startPosition++
			endPosition++
		}
	})
	return winner
} 

function checkVerticalWinner(grid) {
	// Checks a grid for a vertical 4 stack winner.
	let rotatedGrid = rotateGrid(grid)
	return checkHorizontalWinner(rotatedGrid, 3)
}

function rotateGrid(grid) {
	// Rotates a grid (array of arrays) on it's side, changing columns to rows and rows to columns.
	const rotatedGrid = [] // Create a container for the columns
	for (let i in range(grid[0]?.length)) { // For each column in our grid
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

function checkWinner(grid) {
	return checkDiagonalWinner(grid) || grid.checkHorizontalWinner(grid) || checkVerticalWinner(grid)
}


module.exports = {
	checkHorizontalWinner,
	checkVerticalWinner,
	checkDiagonalWinner,
	checkWinner
}