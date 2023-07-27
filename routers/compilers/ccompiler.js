const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')
const path = require('path')


let COMPILE_COMMAND = (codeFile, exeFile) => {
    return ('gcc ./files/' + codeFile + ' -o ./files/' + exeFile)
}
let RUN_COMMAND = (exeFile, inputFile) => {
    return ('./files/' + exeFile + ' < ./files/' + inputFile)
}


class CCompiler extends Compiler {
    constructor() {
        super()
    }
}
let ccompiler = new CCompiler()


router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        let files = await ccompiler.storeCode('c', code, input)
        files.exeFile = files.codeFile.slice(0, files.codeFile.length - ('.c'.length))

        let output = await ccompiler.execute(COMPILE_COMMAND(files.codeFile, files.exeFile), RUN_COMMAND(files.exeFile, files.inputFile))
        res.send(output)
        
        ccompiler.removeFile(files.codeFile)
        ccompiler.removeFile(files.exeFile)
        ccompiler.removeFile(files.inputFile)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router