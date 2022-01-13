let turn = 0
let player1 = "red"


let grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]



function takeTurn(e) {
    const id = e.target.id   // Element Board Space ID
    const colNum = id[8]
    const rowNum = id[3]

    const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
    console.log(`Lowest available row: ${lowestAvailableRow}`)
    if (lowestAvailableRow !== null) {
        turn++

        if (player1 === "red") {
            grid[lowestAvailableRow][colNum - 1] = "red"
            document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'red';
            player1 = "yellow"
        } else {
            grid[lowestAvailableRow][colNum - 1] = "yellow"
            document.getElementById(`row${lowestAvailableRow + 1}-col${colNum}`).style.backgroundColor = 'yellow';
            player1 = "red"
        }
    }
    console.log(`You clicked column ${colNum}`)
    console.log(`Turn number ${turn}`)
    let winner = checkWinner(grid)
    console.log(`Winner: ${winner}`)
    if (winner) {
        // Make something on the DOM say you won!
    }
}


function getLowestAvailableRowInColumn(columnNumber, grid) {
    for (let i = 5; i >= 0; i--) {
        if (grid[i][columnNumber - 1] === null) {
            return i
        }
    }
    return null;
}
//document.getElementById(****).
function resetGame(){
    console.log("reset game")
    for (i of document.getElementsByClassName('col'))
        {
        i.style.removeProperty('background-color');
        }
    
        grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ]
        player = "red"
}


function checkWinner(grid) {
    return checkDiagonalWinner(grid) || checkHorizontalWinner(grid) || checkVerticalWinner(grid)
}

function checkHorizontalWinner(grid, potentialMatches=4) {
    // Scan every match of 4 in a row (or column) for the win condition.
    let winner = false
    grid.forEach(row => { // For each row in our board
        let startPosition = 0 
        let endPosition = 4 
        for (_ in range(potentialMatches)) {
            rowSlice = row.slice(startPosition, endPosition) // Scan the row for a match of 4
            if (checkWinCondition(rowSlice)) {
                winner = true
            }
            startPosition++
            endPosition++
        }
    })
    return winner
}


function checkVerticalWinner(grid) {
    let winner = false

    // Turn the board 
    const columns = [] // Create a container for the columns
    for (i in range(grid[0].length)) { // For each column in our grid
        columns.push([])  // Create an empty column inside of our columns container
        grid.forEach(row => {
            columns[i].push(row[i])
        })
    }
    winner = checkHorizontalWinner(columns, 3)
    return winner
}

function checkDiagonalWinner(grid) {
    let winner = false
    let potentialVerticalPosition = 3
    let potentialHorizontalPosition = 4

    // For every available vertical 4x4 subgrid in our game board...
    for (y in range(potentialVerticalPosition)) {
        y = Number(y)

        // For every available vertical 4x4 subgrid in our game board...
        for (x in range(potentialHorizontalPosition)) {
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
    return arr.every(value => typeof value === 'string')
}





function range(num) {
    // Mimicks the Array function in Python
    // From stackoverflow: https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    return [...Array(num).keys()]
}