function GameOfLife(seed = []) {
    this.world = seed;
}

GameOfLife.prototype.candidates = function () {
    var candidates = this.world.map(cell => {
        var candidatesForCell = [];
        for (var x = cell.x - 1; x <= cell.x + 1; x++) {
            for (var y = cell.y - 1; y <= cell.y + 1; y++) {
                candidatesForCell.push({'x': x, 'y': y});
            }
        }
        return candidatesForCell;
    });

    // flatten the array of candidate cells
    return Array.prototype.concat.apply([], candidates);
};

GameOfLife.prototype.neighbours = function (cell) {
    return this.world.filter(neighbour =>
        !(neighbour.x == cell.x && neighbour.y == cell.y) &&
        neighbour.x >= cell.x - 1 && neighbour.x <= cell.x + 1 &&
        neighbour.y >= cell.y - 1 && neighbour.y <= cell.y + 1)
};

GameOfLife.prototype.iterate = function () {
    return this.candidates().filter(candidate => {
        var neighbours = this.neighbours(candidate);
        var worldContainsCandidate = this.world.find(c => c.x == candidate.x && c.y == candidate.y) != undefined;
        return worldContainsCandidate && neighbours.length == 2 || neighbours.length == 3
    });
};

module.exports = GameOfLife;
