export { runFunction, openModal }

import { getFunctionsArray, functionsSavedPath } from "./data.js"
import { fetchServer } from "./python.js"

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

// ------------- Modal Dialog -----------------

const modal_param = document.getElementById('modal_param')
const close_modal = document.getElementById('close modal_param')
const param_form = document.getElementById('param_form')

function openModal() {
    modal_param.close()
    modal_param.showModal()
}

close_modal.addEventListener('click', () => {
    modal_param.close()
})