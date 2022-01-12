const tag = document.getElementById("header")
tag.innerText = "connect 4"
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
    const id = e.target.id   // 'row1-col1'   ________x
    // 'rowY-colX' 

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
    console.log(grid)
}


function getLowestAvailableRowInColumn(cynthiaColumnNumber, myGridSoItIs) {
    for (let i = 5; i >= 0; i--) {
        if (myGridSoItIs[i][cynthiaColumnNumber - 1] === null) {
            return i
        }
    }


    return null;
}
