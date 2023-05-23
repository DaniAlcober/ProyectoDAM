
let fs = require('fs')
const path = require('path')

var functionsTable = document.getElementById('functionsTable')
var functionsSavedPath = 'src/data/functions.json'

// Load functions saved
updateFunctionsToTable(getFunctionsArray(functionsSavedPath))

// Get an array of functions from a file
function getFunctionsArray(path) {
    let fsFunctions = fs.readFileSync(path)
    let functionsArray = new Array()
    functionsArray = JSON.parse(fsFunctions)
    return functionsArray
}

// Builds the rows of the table of functions from an array
function updateFunctionsToTable(functions) {
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
    let dropdownOptions = document.querySelectorAll('.dropdown-options ul li')

    for (var i = 0; i < dropdownOptions.length; i++) {
        dropdownOptions[i].addEventListener('click', (e) => {
            var id_array = (e.target.id).split('-')

            // Run
            if (id_array[0] == 'run') {
                runFunction(id_array[1])
                console.log(id_array[1] + 'RUN')
                return true
            }

            // Delete
            if (id_array[0] == 'delete') {
                deleteFunction(id_array[1])
                console.log(id_array[1] + ' DELETED')
                return true
            }

            // Add
        })
    }
}



// Añadir funciones persistentes a la tabla
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

// Run function
function runFunction(funcName) {
    let functionsSaved = getFunctionsArray(functionsSavedPath)

    functionsSaved.find(f => {
        if (f.name == funcName) {
            f.values = [3, 7]
            fetchServer('runFunction', f)
        }
    })
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



// ------------- Comunicación con Python --------------

// Iniciar el server
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

// Añadir funciones del archivo seleccionado a la tabla.
function fetchServer(function_route, function_object) {
    var route = 'http://127.0.0.1:5002/' + function_route
    route += '?file=' + function_object.file

    if (function_route == 'runFunction') {
        route += '&function=' + function_object.name

        if (function_object.parameters.length > 0) {
            route += '&'

            let param_array = []
            for (var i = 0; i < function_object.parameters.length; i++) {
                var param_string = function_object.parameters[i] + '=' + function_object.values[i]
                param_array.push(param_string)
            }
            route += param_array.join('&')
        }

        fetch(route).then(data => {
            return data.text()
        }).then(text => {
            console.log(text)
        }).catch(err => {
            console.log(err)
        })

        return true
    }


    const answer = fetch(route).then(data => {
        return data.text()
    }).then(text => {
        return text
    }).catch(err => {
        console.log(err)
    })

    return answer
}


