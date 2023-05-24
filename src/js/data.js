export {getFunctionsArray, functionsSavedPath}

let fs = require('fs')

var functionsSavedPath = 'src/data/functions.json'

// Get an array of functions from a file
function getFunctionsArray(path) {
    let fsFunctions = fs.readFileSync(path)
    let functionsArray = new Array()
    functionsArray = JSON.parse(fsFunctions)
    return functionsArray
}