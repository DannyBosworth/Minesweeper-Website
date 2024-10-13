let gamecells = [];
let table = undefined;
let width = 0;
let height = 0;
let mines = 0;
let firstmove = false;
let tableheight = "";
let timer = undefined
let solver = false;
let theme = "Green";

function createTable(boardwidth, boardheight, boardmines) {

    gamecells = [];
    width = boardwidth;
    height = boardheight;
    mines = boardmines;
    firstmove = true;

    if (timer != undefined) {timer.stop();}
    timer = new Timer(document.getElementById("timer"));

    let board = document.getElementById("board");
    table = document.createElement("table");
    board.appendChild(table);

    if (tableheight == "") {tableheight = "75%";}
    table.style.height = tableheight;
    table.style.width = String((table.clientHeight / height) * width) + "px";

    table.style.tableLayout = "fixed";
    table.id = "table";

    for (let j = 0; j < height; ++j) {

        let tr = table.insertRow();
        gamecells[j] = [];

        for (let i = 0; i < width; ++i) {

            let td = tr.insertCell();
            gamecells[j][i] = new GameCell(td, j, i);
            gamecells[j][i].addEvents(j, i);
        }
        
    }

    populateCells();
    generateCells();
}

function reset(e) {

    if (e.key == " ") {

        document.getElementById("board").innerHTML = "";
        createTable(width, height, mines);

    }
}

function zoomBoard(e) {

    if (e.shiftKey) {

        e.preventDefault()

        if (scrollDirection(e)) {
        
            tableheight = String(Number(table.style.height.slice(0, -1)) + 8) + "%"
        } else {

            tableheight = String(Number(table.style.height.slice(0, -1)) - 8) + "%"
        }

        table.style.height = tableheight
        table.style.width = String((table.clientHeight / height) * width) + "px";
    }
}

function scrollDirection(e) {

    if (e.wheelDelta) {

        return e.wheelDelta > 0;
    }

    return e.wheelDelta < 0
}

function checkValidity(width, height, mines) {

    if (width == 0 || height == 0 || mines == 0) {return false;}
    if (width > 30 || height > 16) {return false;}
    if (mines >= width * height) {return false;}
    return true;
}

function defaultBoard() {
    document.getElementById("width").value = 5;
    document.getElementById("height").value = 5;
    document.getElementById("mines").value = 24;
    createTable(document.getElementById("width").value,document.getElementById("height").value,document.getElementById("mines").value);
}

function populateCells() {

    let count = 0;

    while (count < mines) {

        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);


        if (!gamecells[y][x].isMine) {

            gamecells[y][x].value = "M";
            count += 1;
        }
    }

    for (let j = 0; j < height; ++j) {
        for (let i = 0; i < width; ++i) {

            if (!gamecells[j][i].isMine) {

                gamecells[j][i].value = generateValue(i, j);
            }
        }
    }
}

function generateValue(i, j) {

    let count = 0;

    if (j != height-1 && gamecells[j+1][i].isMine) {count += 1;}
    if (i != width-1 && gamecells[j][i+1].isMine) {count += 1;}
    if (j != 0 && gamecells[j-1][i].isMine) {count += 1;}
    if (i != 0 && gamecells[j][i-1].isMine) {count += 1;}
    if (j != height-1 && i != width-1 && gamecells[j+1][i+1].isMine) {count += 1;}
    if (j != 0 && i != 0 && gamecells[j-1][i-1].isMine) {count += 1;}
    if (j != height-1 && i != 0 && gamecells[j+1][i-1].isMine) {count += 1;}
    if (j != 0 && i != width-1 && gamecells[j-1][i+1].isMine) {count += 1;}
    
    return count;

}

function clearZeros(j, i) {

    if (j != height-1 && gamecells[j+1][i].checkZeros()) {clearZeros(j+1, i);}
    if (i != width-1 && gamecells[j][i+1].checkZeros()) {clearZeros(j, i+1);}
    if (j != 0 && gamecells[j-1][i].checkZeros()) {clearZeros(j-1, i);}
    if (i != 0 && gamecells[j][i-1].checkZeros()) {clearZeros(j, i-1);}
    if (j != height-1 && i != width-1 && gamecells[j+1][i+1].checkZeros()) {clearZeros(j+1, i+1);}
    if (j != 0 && i != 0 && gamecells[j-1][i-1].checkZeros()) {clearZeros(j-1, i-1);}
    if (j != height-1 && i != 0 && gamecells[j+1][i-1].checkZeros()) {clearZeros(j+1, i-1);}
    if (j != 0 && i != width-1 && gamecells[j-1][i+1].checkZeros()) {clearZeros(j-1, i+1);}
}

function checkWin() {

    if (document.getElementsByClassName("cellU").length + document.getElementsByClassName("cellF").length == mines) {

        while (document.getElementsByClassName("cellU").length) {

            document.getElementsByClassName("cellU").item(0).className = "cell cellF";
        }

        document.getElementById("table").className = "disable";
        timer.stop();
    }
}

function lostGame() {

    for (let j = 0; j < height; ++j) {

        for (let i = 0; i < width; ++i) {

            gamecells[j][i].gameLost();
        }
    }

    document.getElementById("table").className = "disable";
    timer.stop();
}

function updateBoard() {

    
    for (let j = 0; j < height; ++j) {

        for (let i = 0; i < width; ++i) {

            if (gamecells[j][i].solvingcell.open == true) {
                gamecells[j][i].cellClicked(gamecells[j][i]);
            } else if (gamecells[j][i].solvingcell.mine == true) {
                gamecells[j][i].flagCell(gamecells[j][i]);
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {createTable(9,9,10); document.getElementById("diffbtn").classList.add("selected");});
document.addEventListener("wheel", function(e) {zoomBoard(e);});
document.addEventListener("keypress", function(e) {reset(e);});

class Timer {

    #starttime;
    #display;
    #interval;

    constructor(display) {

        this.#display = display;
        this.display = 0.0
    }

    start() {

        this.#starttime = Date.now();
        this.#interval = setInterval(timer.displayTime, 100);
    }

    stop() {


        clearInterval(this.#interval);
    }

    displayTime() {

        timer.display = timer.getTime();

    }

    getTime() {

        return Date.now() - this.#starttime;
    }

    set display(newtime) {

        this.#display.innerText = (Math.round(newtime / 100, 2) / 10).toFixed(1);
    }

    get interval() {

        return this.#interval;
    }
}