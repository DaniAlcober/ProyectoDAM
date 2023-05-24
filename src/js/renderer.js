
let fs = require('fs')
const path = require('path')

var functionsSavedPath = 'src/data/functions.json'

import { getFunctionsArray } from './data.js'
import { fetchServer } from './python.js'
import { updateFunctionsToTable } from './table.js'

// Load functions saved
updateFunctionsToTable(getFunctionsArray(functionsSavedPath))

var btn_addFunctions = document.getElementById('addFunctions')

// Add functions to function.JSON checking for duplicates, then calls updateFunctionsToTable
function addFunctions(functionsArray) {
    let functionsArrayTemp = getFunctionsArray(functionsSavedPath)
    const functionsSaved = getFunctionsArray(functionsSavedPath)
    let repeatedCount = 0;
    let addedCount = 0;
    let repeated
    for (var func of functionsArray) {
        repeated = false

        for (var funcSaved of functionsSaved) {
            if ((func.name).localeCompare(funcSaved.name) == 0) {
                repeatedCount++
                repeated = true
                break;
            }
        }

        if (!repeated) {
            addedCount++
            functionsArrayTemp.push(func)
        }
    }

    fs.writeFileSync(functionsSavedPath, JSON.stringify(functionsArrayTemp))
    updateFunctionsToTable(functionsArrayTemp)

    console.log('Added: ' + addedCount + '; Repeated: ' + repeatedCount)
}



// Delete function from function.JSON, then calls updateFunctionsToTable
function deleteFunction(funcName) {
    let functionsSaved = getFunctionsArray(functionsSavedPath)

    functionsSaved.find((f, index) => {
        if (f.name == funcName) {
            functionsSaved.splice(index, 1)
            return true
        }
    })

    fs.writeFileSync(functionsSavedPath, JSON.stringify(functionsSaved))
    updateFunctionsToTable(functionsSaved)
}

var btn_file = document.getElementById('file')
let file, fileName, fileExt

btn_file.onchange = e => {
    file = e.target.files[0].name
    fileName = path.parse(file).name
    fileExt = path.parse(file).ext
}

btn_addFunctions.addEventListener('click', () => {
    var args = {
        file: `${fileName}`
    }
    fetchServer('getFunctions', args).then(text => {
        addFunctions(JSON.parse(text))
    }).catch(err => {
        console.log(err)
    })

})










