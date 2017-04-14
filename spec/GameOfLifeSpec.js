/* eslint-disable */

describe("In the Game of Life", () => {
    const GameOfLife = require("../lib/GameOfLife");

    describe("For a single iteration of the game", () => {
        it("when there are no living cells, none will come to life", () => {
            let game = new GameOfLife();
            expect(game.iterate()).toEqual([]);
        });

        it("when only one cell is alive, it will die and there will be no living cells", () => {
            let game = new GameOfLife([{x: 1, y: 1}]);
            expect(game.iterate()).toEqual([]);
        });

        describe("a living cell with neighbours", () => {
            it("will die with only a single neighbour", () => {
                let game = new GameOfLife([{x: 1, y: 1}, {x: 1, y: 2}]);
                expect(game.iterate()).toEqual([]);
            });

            it("will survive with 2 neighbours", () => {
                let game = new GameOfLife([{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}]);
                expect(game.iterate()).toContain({x: 1, y: 2});
            });

            it("will survive with 3 neighbours", () => {
                let game = new GameOfLife([{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 2}]);
                expect(game.iterate()).toContain({x: 1, y: 2});
            });

            it("will die with more than 3 neighbours", () => {
                let game = new GameOfLife([{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 2, y: 2}]);
                expect(game.iterate()).not.toContain({x: 1, y: 2});
            });
        });

        describe("a currently vacant set of coordinates", () => {
            it("will give rise to a new living cell when there are exactly 3 neighbours", () => {
                let game = new GameOfLife([{x: 1, y: 1}, {x: 1, y: 3}, {x: 2, y: 1}]);
                expect(game.iterate()).toContain({x: 1, y: 2});
            });
        });
    });
});