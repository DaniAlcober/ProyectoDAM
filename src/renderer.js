let fs = require('fs')
const path = require('path')

var functionsTable = document.getElementById('functionsTable')
var functionsSavedPath = 'src/data/functions.json'

// Load functions saved
addFunctionsToTable(getFunctionsArray(functionsSavedPath))

// Get an array of functions from a file
function getFunctionsArray(path) {
    let fsFunctions = fs.readFileSync(path)
    let functionsArray = new Array()
    functionsArray = JSON.parse(fsFunctions)
    return functionsArray
}

// Adds rows to the table from an array
function addFunctionsToTable(functions) {
    var functionsTableHtml = ''
    functions.forEach(func => {
        functionsTableHtml +=
            `<tr>
                <td>${func.name}</td>
                <td>${func.parameters}</td>
                <td></td>
                <td>${func.file}</td>
                <td>
                    <div class="dropdown">
                        <i class="fa fa-bars"></i>
                        <div class="dropdown-options">
                            <ul>
                                <li id="run-${func.name}">Run</li>
                                <li id="add-${func.name}">Add to set</li>
                                <li id="delete-${func.name}">Delete</li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>`
    })

    // Add listener to dropdown options on every function
    functionsTable.innerHTML = functionsTableHtml
    let dropdownOptions = document.querySelectorAll('.dropdown-options ul li');
    for (var i = 0; i < dropdownOptions.length; i++) {
        dropdownOptions[i].addEventListener('click', (e) => {
            console.log(e.target.id);
        })
    }
}

// Prueba añadir funciones persistentes a la tabla
var btn_addFunctions1 = document.getElementById('addFunctions1')

// Add functions to function.JSON checking for duplicates, then calls addFunctionsToTable
function addFunctions(functionsArray) {
    let functionsArrayTemp = getFunctionsArray(functionsSavedPath)
    const functionsSaved = getFunctionsArray(functionsSavedPath)
    let repeatedCount = 0;
    let addedCount = 0;
    let repeated
    for (func of functionsArray) {
        repeated = false

        for (funcSaved of functionsSaved) {
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
    addFunctionsToTable(functionsArrayTemp)
    console.log('Added: ' + addedCount + '; Repeated: ' + repeatedCount)
}

var btnFile = document.getElementById('file')
let file, fileName, fileExt


btnFile.onchange = e => {
    file = e.target.files[0].name
    fileName = path.parse(file).name
    fileExt = path.parse(file).ext
}

sendToPython()
function sendToPython() {
    var { PythonShell } = require('python-shell')
    let options = {
        mode: 'text'
    };

    PythonShell.run('C:/Favoritos/DAM/Proyecto/ProyectoDAM/py/server.py', options).then(res => {
        console.log('results: ', res)
    })
}

btn_addFunctions1.addEventListener('click', () => {
    fetch(`http://127.0.0.1:5002/getFunctions?file=${fileName}`).then(data => {
        return data.text()
    }).then(text => {
        addFunctions(JSON.parse(text))
    }).catch(err => {
        console.log(err)
    })
})
