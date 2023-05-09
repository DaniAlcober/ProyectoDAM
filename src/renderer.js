var btnFile = document.getElementById('file')
var btnShowFunctions = document.getElementById('showFunctions')
var btnFile = document.getElementById('file')
var functions = document.getElementById('functions')

let file

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