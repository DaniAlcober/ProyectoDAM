let fs = require('fs')

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

    functionsTable.innerHTML = functionsTableHtml
}

// Add listener to dropdown options on every function
let dropdownOptions = document.querySelectorAll('.dropdown-options ul li');
for (var i = 0; i < dropdownOptions.length; i++) {
    dropdownOptions[i].addEventListener('click', (e) => {
        console.log(e.target.id);
    })
}

// Prueba añadir funciones persistentes a la tabla
var btn_addFunctions1 = document.getElementById('addFunctions1')
var btn_addFunctions2 = document.getElementById('addFunctions2')
var btn_addFunctions3 = document.getElementById('addFunctions3')

function addFunctions(path) {
    const functionsArray = getFunctionsArray(path)
    let functionsArrayTemp = getFunctionsArray(functionsSavedPath)
    const functionsSaved = getFunctionsArray(functionsSavedPath)
    let repeatedCount = 0;
    let addedCount = 0;
    let repeated
    for (func of functionsArray) {
        repeated = false

        for (funcSaved of functionsSaved) {
            console.log("File: " + func.name + "; Saved: " + funcSaved.name)
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

btn_addFunctions1.addEventListener('click', () => {
    addFunctions('src/data/file1.json')
})

btn_addFunctions2.addEventListener('click', () => {
    addFunctions('src/data/file2.json')
})

btn_addFunctions3.addEventListener('click', () => {
    addFunctions('src/data/file3.json')
})


/* 
btnFile.onchange = e => {
    file = e.target.files[0]
    sendToPython()
}

function sendToPython() {
    var { PythonShell } = require('python-shell')
    let options = {
        mode: 'text'
    };

    PythonShell.run(file.path, options).then(res => {
        console.log('results: ', res)
    })
}

btnShowFunctions.addEventListener('click', () => {
    console.log('Hola')
    fetch('http://127.0.0.1:5002/getFunctions').then(data => {
        return data.text()
    }).then(text => {
        console.log('Functions: ' + text)
        functions.innerHTML = text;
    }).catch(err => {
        console.log(err)
    })
    
})
*/
