import fs from 'fs'
import path from 'path'
const loadGQLFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return {}
    }
    return fs.readFileSync(filePath, 'utf-8')
}

export default loadGQLFile