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

    /**
     * The following tests look for patterns as described on the 
     * Game of Life Wikipedia page.
     * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
     */
    describe("Over multiple iterations of a game", () => {
        describe("some patterns oscillate between several states", () => {
            it("giving rise to a Blinker", () => {
                let first = [{x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}];
                let second = [{x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}];
                let game = new GameOfLife(first);
                expect(game.iterate()).toEqual(second);
                expect(game.iterate()).toEqual(first);
                expect(game.iterate()).toEqual(second);
            });

            it("giving rise to a Beacon", () => {
                let first = [{x: 2, y: 3}, {x: 2, y: 3}, {x: 3, y: 2}, {x: 3, y: 3},
                             {x: 4, y: 4}, {x: 4, y: 5}, {x: 5, y: 4}, {x: 5, y: 5}];

                let second = [{x: 2, y: 3}, {x: 2, y: 3}, {x: 3, y: 2},
                              {x: 4, y: 5}, {x: 5, y: 4}, {x: 5, y: 5}];

                let game = new GameOfLife(first);
                expect(game.iterate().sort).toEqual(second.sort);
                expect(game.iterate().sort).toEqual(first.sort);
                expect(game.iterate().sort).toEqual(second.sort);
            });
        });

        describe("some patterns form still lifes", () => {
            it("such as the block", () => {
                let seed = [{x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 2}, {x: 3, y: 3}];
                let game = new GameOfLife(seed);
                expect(game.iterate()).toEqual(seed);
                expect(game.iterate()).toEqual(seed);
            });

            it("such as the beehive", () => {
                let seed = [{x: 3, y: 2}, {x: 4, y: 2},
                            {x: 2, y: 3}, {x: 5, y: 3},
                            {x: 3, y: 4}, {x: 4, y: 4}];

                let game = new GameOfLife(seed);
                expect(game.iterate().sort).toEqual(seed.sort);
                expect(game.iterate().sort).toEqual(seed.sort);
            });
        });
    });
});
