class GameCell {

    #value;
    #td;
    #opened;
    #flagged;
    #adjacents;
    #solvingcell

    constructor(td, j, i) {

        this.#td = td;
        this.#td.className = "cell cellU colour" + theme;
        this.#td.id = String(j) + " " + String(i);

        this.#opened = false;
        this.#flagged = false;

        this.#solvingcell = new SolverCell("U")
    }

    addEvents(j, i) {

        this.#td.addEventListener("click", function() {gamecells[j][i].cellClicked(gamecells[j][i]); solve();});
        this.#td.addEventListener("contextmenu", function(e) {gamecells[j][i].cellFlagged(gamecells[j][i], e);});
    }

    flagCell(cell) {

        cell.updateClass("F");
        cell.#flagged = true;
    }

    cellFlagged(cell, clickevent) {

        clickevent.preventDefault();

        if (!(cell.#opened)) {
            if (!(cell.#flagged)) {cell.updateClass("F");} 
            else {cell.updateClass("U");}
        }

        cell.#flagged = !(cell.#flagged);
    }

    cellClicked(cell) {

        if (firstmove) {

            firstmove = false;
            timer.start();
            if (cell.isMine) {this.moveMine(cell);}
        }

        if (!(cell.#flagged)) {
            
            cell.updateClass();
            
            if (document.getElementById("table").className != "disable") {
                
                cell.openCell();
                checkWin();
    
                if (cell.#value == "0") {clearZeros(parseInt(cell.#td.id.split(" ")[0]), parseInt(cell.#td.id.split(" ")[1]));}
    
                adjacentsCounter();
            }
            
        }

    }

    moveMine(cell) {

        let x = 0;
        let y = 0;
        let swapped = false;

        do {

            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);


            if (!gamecells[y][x].isMine) {

                gamecells[y][x].#value = "M";
                swapped = true;
            }

        } while (!swapped);

        cell.#value = ""

        for (let j = 0; j < height; ++j) {

            for (let i = 0; i < width; ++i) {
    
                if (!gamecells[j][i].isMine) {gamecells[j][i].#value = generateValue(i, j);}
            }
        }

    }

    checkZeros() {

        if (!this.isMine) {

            this.updateClass();

            if (this.#value == "0" && !(this.#opened)) {

                this.openCell();
                return true;
            }
        }

        this.openCell();
        return false;
    }

    gameLost() {

        if (this.isMine) {

            if (!(this.#opened)) {this.updateClass("L");}
        }
    }


    get value() {
        
        return this.#value;
    }

    get td() {

        return this.#td;
    }

    get opened() {

        return this.#opened;
    }

    get flagged() {

        return this.#flagged;
    }

    set value(value) {

        this.#value = value;
    }

    get isMine() {

        if (this.#value == "M") {return true;}
        return false;
    }

    get adjacents() {

        return this.#adjacents
    }

    set adjacents(adjacents) {

        this.#adjacents = adjacents
    }

    get solvingcell() {

        return this.#solvingcell;
    }

    updateClass(state) {

        if (state == "F") {

            this.#td.className = "cell cellF";
        } else if(state == "U") {

            this.#td.className = "cell cellU colour" + theme;
        } else if(state =="L") {

            this.#td.className = "cell cellL";
        } else if(!(this.#opened)) {

            this.#td.className = "cell cell" + this.#value;
            if (this.isMine) {this.openCell(); lostGame();}
        }
    }

    openCell() {

        this.#opened = true;
        console.log(solver);
        if (solver) this.#solvingcell.openCell(this.#value)
    }


}