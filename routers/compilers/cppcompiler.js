const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')


let COMPILE_COMMAND = (codeFile, exeFile) => {
    return ('g++ ./files/' + codeFile + ' -o ./files/' + exeFile)
}
let RUN_COMMAND = (exeFile, inputFile) => {
    return ('./files/' + exeFile + ' < ./files/' + inputFile)
}


class CPPCompiler extends Compiler {
    constructor() {
        super()
    }
}
let cppcompiler = new CPPCompiler()


router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        let files = await cppcompiler.storeCode('cpp', code, input)
        files.exeFile = files.codeFile.slice(0, files.codeFile.length - ('.cpp'.length))

        let output = await cppcompiler.execute(COMPILE_COMMAND(files.codeFile, files.exeFile), RUN_COMMAND(files.exeFile, files.inputFile))
        res.send(output)
        
        cppcompiler.removeFile(files.codeFile)
        cppcompiler.removeFile(files.exeFile)
        cppcompiler.removeFile(files.inputFile)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router