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

