//var btnFile = document.getElementById('file')
var btnShowFunctions = document.getElementById('showFunctions')
var btnFile = document.getElementById('file')
var functionsTable = document.getElementById('functionsTable')

//let file

let fs = require('fs')

let fsFunctions = fs.readFileSync('src/data/functions.json');
let functionsArray = new Array();
functionsArray = JSON.parse(fsFunctions)

btnShowFunctions.addEventListener('click', () => {
    functionsArray.forEach(func => {
        functionsTable.innerHTML +=
            `
            <tr>
                <td>${func.name}</td>
                <td>${func.parameters}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            `
    });

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
