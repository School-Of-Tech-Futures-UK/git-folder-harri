const grid = require("./grid")
let test_grid = []

describe("checkHorizontal and vertical winner", () => {
	beforeEach(() => {

		test_grid = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null]
		]   
	}
	)

	test("will return false for an empty grid ", () => {
		
		expect(grid.checkHorizontalWinner(test_grid, 5)).toBeFalsy()  
	}),

	test("testing horizontal success conditions with yellow", () => {
		test_grid[5] = ["yellow", "yellow", "yellow", "yellow", null, null, null]
		expect(grid.checkHorizontalWinner(test_grid, 4)).toBeTruthy()      
	}),

	test("testing horizontal success conditions with red", () => {
		test_grid[5] = ["red", "red", "red", "red", null, null, null]	
		expect(grid.checkHorizontalWinner(test_grid, 2)).toBeTruthy()      
	})

	test("will return false for an empty grid ", () => {
		
		expect(grid.checkVerticalWinner(test_grid, 3)).toBeFalsy()  
	}),

	test("testing vertical success conditions with yellow", () => {
		/*test_grid[0][0] = [null]
		test_grid[1][0] = [null]
		test_grid[2][0] = ["yellow"]
		test_grid[3][0] = ["yellow"]
		test_grid[4][0] = ["yellow"]*/
		test_grid[5] = ["yellow", "yellow", "yellow", "yellow", null, null]
		console.log(test_grid)
		expect(grid.checkVerticalWinner(test_grid, 4)).toBeTruthy()      
	}),

	test("testing vertical success conditions with red", () => {
		test_grid[4] = ["red", "red", "red", "red", null, null, null]	
		expect(grid.checkVerticalWinner(test_grid, 4)).toBeFalsy()      
	})
})