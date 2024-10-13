cells = []


function solve() {

    let update = true;

    while (update && document.getElementById("table").className != "disable") {

        update = false;

        for (let j = 0; j < height; ++j) {

            for (let i = 0; i < width; ++i) {

                if (cells[j][i].isKnown) {cells[j][i].findMines();}
            }
        }

        for (let j = 0; j < height; ++j) {

            for (let i = 0; i < width; ++i) {

                if (cells[j][i].isKnown && cells[j][i].findSafe()) {

                    update = true;
                }
            }
        }

        checkWin()

        if (update) {updateBoard();}
    }

    updateBoard()
}

function generateCells() {

    for (let j = 0; j < height; ++j) {

        cells[j] = []

        for (let i = 0; i < width; ++i) {

            cells[j][i] = gamecells[j][i].solvingcell;
        }
    }

    adjacentsCounter()
}

function adjacentsCounter() {

    tempadjacents = []

    for (let j = 0; j < height; ++j) {

        for (let i = 0; i < width; ++i) {

            if (!cells[j][i].isKnown) {continue;}

            if (j != height-1 && !cells[j+1][i].isKnown) {tempadjacents.push(cells[j+1][i]);}
            if (i != width-1 && !cells[j][i+1].isKnown) {tempadjacents.push(cells[j][i+1]);}
            if (j != 0 && !cells[j-1][i].isKnown) {tempadjacents.push(cells[j-1][i]);}
            if (i != 0 && !cells[j][i-1].isKnown) {tempadjacents.push(cells[j][i-1]);}
            if (j != height-1 && i != width-1 && !cells[j+1][i+1].isKnown) {tempadjacents.push(cells[j+1][i+1]);}
            if (j != 0 && i != 0 && !cells[j-1][i-1].isKnown) {tempadjacents.push(cells[j-1][i-1]);}
            if (j != height-1 && i != 0 && !cells[j+1][i-1].isKnown) {tempadjacents.push(cells[j+1][i-1]);}
            if (j != 0 && i != width-1 && !cells[j-1][i+1].isKnown) {tempadjacents.push(cells[j-1][i+1]);}

            cells[j][i].adjacents = tempadjacents;
            tempadjacents = []
        }
    }
}
