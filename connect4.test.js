const connect4 = require("./connect4")

describe("checkHorizontalWinner", () => {
	/*beforeEach(() => {

        let test_grid = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null]
		]
        
	}
	)*/
	test("will return false for an empty grid ", () => {
		let test_grid = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null]
		]
		expect(connect4.checkHorizontalWinner(test_grid, 5)).toBeFalsy()  
	}),

	test("testing horizontal success conditions with yellow", () => {
		let test_grid = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			["yellow", "yellow", "yellow", "yellow", null, null, null]
		]
		expect(connect4.checkHorizontalWinner(test_grid, 4)).toBeTruthy()      
	}),

	test("testing horizontal success conditions with red", () => {
		let test_grid = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			["red", "red", "red", "red", null, null, null]
		]
		expect(connect4.checkHorizontalWinner(test_grid, 2)).toBeTruthy()      
	})
})