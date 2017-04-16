function GameOfLife(seed = []) {
    this.world = seed;
}

GameOfLife.prototype.candidates = function () {
    // build and flatten a collection of candidate cells
    return Array.prototype.concat.apply([], this.world.map(cell => 
        Array.prototype.concat.apply([], [cell.x - 1, cell.x, cell.x + 1].map(x =>
            [cell.y - 1, cell.y, cell.y + 1].map(y => ({x, y}))
        ))
    )).reduce((acc, cell) => {
        // remove duplicate candidate cells
        if (!acc.find(c => c.x == cell.x && c.y == cell.y)) 
            acc.push(cell);
        return acc;
    }, []);
};

GameOfLife.prototype.neighbours = function (cell) {
    return this.world.filter(neighbour =>
        !(neighbour.x == cell.x && neighbour.y == cell.y) &&
        Math.abs(neighbour.x - cell.x) <= 1 &&
        Math.abs(neighbour.y - cell.y) <= 1)
};

GameOfLife.prototype.iterate = function () {
    this.world = this.candidates().filter(candidate => {
        const neighbours = this.neighbours(candidate);
        const livingCell = this.world.find(c => c.x == candidate.x && c.y == candidate.y);
        return livingCell && neighbours.length == 2 || neighbours.length == 3
    });

    return this.world;
};

if (typeof module !== 'undefined') 
    module.exports = GameOfLife;
