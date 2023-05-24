export { fetchServer }

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