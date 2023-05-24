export { updateFunctionsToTable }

import { runFunction, openModal } from './func_options.js'
import { getFunctionsArray, functionsSavedPath } from './data.js'

var functionsTable = document.getElementById('functionsTable')

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
                // Ask parameters
                var functionsSaved = getFunctionsArray(functionsSavedPath)
                var formHtml = ''

                functionsSaved.find(f => {
                    if (f.name == id_array[1]) {
                        for (var param of f.parameters) {
                            formHtml +=
                                `
                                    <label for="${param}-value">${param}<input type="text" id="${param}-value"><br>
                                `
                        }
                    }

                    param_form.innerHTML = formHtml;

                    openModal()
                })



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