class SolverCell{

    #value;
    #adjacents;
    #mine;
    #open;

    constructor(value) {

        this.#value = value;
        this.#mine = false;
        this.#open = false;

    }

    findMines() {

        if (this.#adjacents.length == 0) {return;}

        if (this.#value == this.#adjacents.length) {

            for (let a of this.#adjacents) {

                a.#mine = true;
            }
        }
    }

    findSafe() {

        if (this.#adjacents.length == 0) {return false;}

        let minecount = 0
        let found = false;

        for (let a of this.#adjacents) {

            if (a.#mine) {minecount += 1;}
        }

        if (minecount == this.#value) {

            for (let a of this.#adjacents) {

                if (!a.#mine) {a.#open = true; found = true;}
            }
        }

        return found;
    }

    openCell(value) {

        this.#value = value;
        this.#open = false;
    }


    get isKnown() {

        if (this.#value == "U") {return false;}
        return true;
    }

    get value() {

        return this.#value;
    }

    set value(value) {

        this.#value = value;
    }

    get adjacents() {

        return this.#adjacents;
    }

    set adjacents(adjacents) {

        this.#adjacents = adjacents;
    }

    get open() {

        return this.#open;
    }

    set open(open) {

        this.#open = open;
    }

    get mine() {

        return this.#mine;
    }

    set mine(mine) {

        this.#mine = mine;
    }
}