import { areSame, calcDistance, getSurroundingCells } from "./helper";

export const findOptimalPath = (table, begin, target) => {
    let open = [{
        i: begin[0],
        j: begin[1],
        g: 0,
        h: calcDistance(begin, target),
        f: calcDistance(begin, target),
        parent: null
    }], closed = [], current;

    while(true){
        current = findOptimalChoice(open);
        open = open.filter(obj => obj.i !== current.i && obj.j !== current.j);
        closed.push(current);

        if(areSame(target, [current.i, current.j])){
            break;
        }

        let surroundingCells = getSurroundingCells(table, [current.i, current.j], begin, target);
        for(let i = 0; i< surroundingCells.length; i++ ){
            let cell = surroundingCells[i];
            
            // skip if in closed (visited)
            if(closed.some(obj => obj.i == cell.i && obj.j == cell.j)){
                continue;
            }
            
            // set cell parent to current and push to open if not exist
            if(!open.some(obj => obj.i == cell.i && obj.j == cell.j)){
                open.push({
                    i: cell.i,
                    j: cell.j,
                    g: cell.g,
                    h: cell.h,
                    f: cell.f,
                    parent: current
                });
            }
        }
    }
    // console.log(open);
    // console.log(closed);
    let path = [], explored = []
    closed.forEach((cell) => {
        path.push([cell.i, cell.j]);
    });
    open.forEach((cell) => {
        explored.push([cell.i, cell.j]);
    });
    path.pop();
    path.shift();
    return [path, explored];
}


const findOptimalChoice = (list) => {
    list.sort((a , b) => {
        if(a.f === a.f){
            if(a.h === b.h){
                return b.g - a.g
            }
            return a.h - b.h;
        }
        return a.f - b.f;
    });
    return list[0];
}