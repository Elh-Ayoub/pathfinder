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
