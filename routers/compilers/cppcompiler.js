const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')

// this command is going to be different for files with different names, hence its made into a function
let COMPILE_COMMAND = (codeFile, exeFile) => {
    return ('g++ ./files/' + codeFile + ' -o ./files/' + exeFile)
}
// same as above
let RUN_COMMAND = (exeFile, inputFile) => {
    return ('./files/' + exeFile + ' < ./files/' + inputFile)
}

// This instantiation of a child of the Compiler class is useful if we need to use
// polymorphism, to create different definitions of parent's functions
class CPPCompiler extends Compiler {
    constructor() {
        super()
    }
}
let cppcompiler = new CPPCompiler()


// to parse incoming json req.body
router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        let files = await cppcompiler.storeCode('cpp', code, input)
        // there will be 3 files to define 1 request,
        // example, 12345.cpp, 12345.txt & 12345(the executable)
        // we add the name of the exe file manually to the files object, this will be used for the COMPILE_COMMAND &
        // RUN_COMMAND on the next line
        files.exeFile = files.codeFile.slice(0, files.codeFile.length - ('.cpp'.length))

        let output = await cppcompiler.execute(COMPILE_COMMAND(files.codeFile, files.exeFile), RUN_COMMAND(files.exeFile, files.inputFile))
        // the output for different scenarios is returned in the output variable only, even the compile time & run time errors themselves
        res.send(output)
        
        // delete all those files that we created.
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