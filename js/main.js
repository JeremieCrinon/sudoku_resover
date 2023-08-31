const solve = document.getElementById('solve');
const txt_grid = document.getElementById('txt_grid');

solve.addEventListener('click', () => {
    solve.style.pointerEvents = "none";
    if (solveGrid()){
        txt_grid.textContent = "Grille résolue";
    } else {
        txt_grid.textContent = "Grille impossible, veuillez corriger!";
        solve.style.pointerEvents = "auto";
    }
});


// Fonction qui vérifie si une ligne est valide
function verifLine(lineNum){
    const line = document.querySelectorAll('.row-' + lineNum);
    let lineTab = [];
    let pass = true;

    line.forEach((cell) => {
        for (let i = 0; i < lineTab.length; i++) {
            if (cell.value == lineTab[i]) {
                pass = false;
            };
        };
        if (!cell.value == "") {
        lineTab.push(cell.value);
        };
    });
    if (pass) {
        return true;
    } else {    
        return false;
    };
};

// Fonction qui vérifie si une colonne est valide
function verifColumn(columnNum){
    const column = document.querySelectorAll('.column-' + columnNum);
    let columnTab = [];
    let pass = true;

    column.forEach((cell) => {
        for (let i = 0; i < columnTab.length; i++) {
            if (cell.value == columnTab[i]) {
                pass = false;
            };
        };
        if (!cell.value == "") {
            columnTab.push(cell.value);
        };
    });
    if (pass) {
        return true;
    } else {    
        return false;
    };
};

// Fonction qui vérifie si un carré est valide
function verifSquare(squareNum){
    const square = document.querySelectorAll('.square-' + squareNum);
    let squareTab = [];
    let pass = true;

    square.forEach((cell) => {
        for (let i = 0; i < squareTab.length; i++) {
            if (cell.value == squareTab[i]) {
                pass = false;
            };
        };
        if (!cell.value == "") {
            squareTab.push(cell.value);
        };
    });
    if (pass) {
        return true;
    } else {    
        return false;
    };
};

// Fonction qui vérifie si la grille est valide
function verifGrid(){
    let pass = true;
    for (let i = 1; i < 10; i++) {
        if (!verifLine(i)) {
            pass = false;
        };
        if (!verifColumn(i)) {
            pass = false;
        };
        if (!verifSquare(i)) {
            pass = false;
        };
    };
    return pass;
};

// Fonction qui vérifie si la grille est complète
function verifComplete(){
    let pass = true;
    const cells = document.querySelectorAll('#sudoku input');
    cells.forEach((cell) => {
        if (cell.value == "") {
            pass = false;
        };
    });
    return pass;
};

// Fonction qui trouve la permière case vide en partant de gauche à droite et de haut en bas
function findEmpty(){
    const cells = document.querySelectorAll('#sudoku input');
    let emptyCell = undefined;
    cells.forEach((cell) => {
        if (cell.value == "" && emptyCell == undefined) {
            emptyCell = cell;
        };
    });
    return emptyCell;
}

// Fonction de resolvage de la grille
function solveGrid(){
    let pass2 = false;
    let pass3 = false;
    let possible = true;
    const cell = findEmpty();
    // console.log(document.querySelector(".row-4.column-4").value);
    let impossibleValue = [];
    while (!pass2 && possible){
        
        let pass = false;

        for (let i = 1; i < 10; i++) {
            if (pass == false) {
                if (!impossibleValue.includes(String(i))) {
                    // console.log(impossibleValue);
                    cell.value = i;
                    if (verifGrid()) {
                        // console.log(i);
                        pass = true;
                    };
                };              
            };
        };

        if (pass == false) {
            cell.value = "";
            pass3 = false;
            // console.log("grille impossible");
            possible = false;
        };


        if (verifComplete() == true) {
            // console.log("Grille complète");
            pass2 = true;
            pass = true;
            pass3 = true;
        };

        if (!pass2 && !pass3 && pass && possible) {
            // console.log("Récurcivitée")
            if (solveGrid()){
                pass2 = true;
                pass3 = true;
            } else {
                // console.log(cell.value);
                // impossibleValue.push(cell.value);
                impossibleValue[impossibleValue.length] = cell.value;
                cell.value = "";             
                if (impossibleValue.length == 9) {
                    // console.log("vvvvv");
                    pass3 = false;
                    possible = false;
                };
            };
        };
        
    };

    if (!possible) {
        // console.log(pass3);
        return false;
    }
   
    
    return pass3;
};
    


