function GameOfLife(seed = []) {
    this.world = seed;
}

GameOfLife.prototype.candidates = function () {
    return Array.prototype.concat.apply([], this.world.map(cell => 
        Array.prototype.concat.apply([], [cell.x - 1, cell.x, cell.x + 1].map(x =>
            [cell.y - 1, cell.y, cell.y + 1].map(y => ({'x': x, 'y': y}))
        ))
    ));
};

GameOfLife.prototype.neighbours = function (cell) {
    return this.world.filter(neighbour =>
        !(neighbour.x == cell.x && neighbour.y == cell.y) &&
        Math.abs(neighbour.x - cell.x) <= 1 &&
        Math.abs(neighbour.y - cell.y) <= 1)
};

GameOfLife.prototype.iterate = function () {
    return this.candidates().filter(candidate => {
        var neighbours = this.neighbours(candidate);
        var worldContainsCandidate = this.world.find(c => c.x == candidate.x && c.y == candidate.y) != undefined;
        return worldContainsCandidate && neighbours.length == 2 || neighbours.length == 3
    });
};

module.exports = GameOfLife;
