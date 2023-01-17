export function randomCell(){
    return [
        Math.floor(Math.random() * Math.floor(window.innerHeight / 25)), 
        Math.floor(Math.random() * Math.floor(window.innerWidth / 25))
    ]
}

export function areSame(arr1, arr2){
    if(arr1.length != arr2.length) return false
    for(let i = 0; i < arr1.length; i++){
        if(arr1[i] != arr2[i]){
            return false
        }
    }
    return true;
}

export function hasArray(source, search){
    for(var i = 0; i < source.length; i++){
        let checker = []
        for(var j = 0; j < source[i].length; j++){
            if(source[i][j] === search[j]){
                checker.push(true)
            } else {
                checker.push(false)
            }
        }
        if (checker.every(check => check === true)){
            return true
        }
    }
    return false
}

export const replaceBtnContainer = (e) => {
    e.target.style.left = e.clientX + "px";
    e.target.style.top = e.clientY + "px";
}


export const generateEnvArray = (table, begin, target, walls) => {
    let res = [];
    for (let i = 0; i < table.length; i++) {
        res.push([]);
        for (let j = 0; j < table[i].length; j++) {
            if(areSame([i, j], begin)){
                res[i][j] = 1
            }
            else if(areSame([i, j], target)){
                res[i][j] = 2
            }
            else if(hasArray(walls, [i, j])){
                res[i][j] = 3
            }
            else res[i][j] = 0
        }
    }
    return res
}

export function calcDistance([x1, y1], [x2, y2]){
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

export function getSurroundingCells(table, [x, y], begin, target) {
    let surroundingCells = [];
  
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            let row = x + i;
            let col = y + j;
            if (row >= 0 && row < table.length && col >= 0 && col < table[0].length) {
                if(table[row][col] !== 3){
                    const g = calcDistance([row, col], begin);
                    const h = calcDistance([row, col], target);
                    surroundingCells.push({
                        i: row, j: col,
                        g: g, h: h,
                        f: g + h
                    });
                }
            }
        }
    }
    return surroundingCells;
}
