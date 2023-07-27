const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')
const fs = require('fs')
const path = require('path')


let COMPILE_COMMAND = (codeFile) => {
    return ('javac -d ./files ./files/' + codeFile)
}
// COMPILE_COMMAND = 'javac -d ./files ./files/JavaProgram.java'
let RUN_COMMAND = (exeFile, inputFile) => {
    return ('java -cp ./files ' + exeFile + ' < ./files/' + inputFile)
}
// RUN_COMMAND = 'java -cp ./files JavaProgram < ./files/input.txt'
let CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789A'
let FILES_DIRECTORY = './files'


class JavaCompiler extends Compiler {
    constructor() {
        super()
    }

    storeCode(extension, code, input) {
        let codeFile = this.generateRandomName(20)  + '.' + extension
        let inputFile = this.generateRandomName(20) + '.txt'

        code = 'public class ' + codeFile.slice(0, codeFile.length - extension.length - 1) + ' {\n' + code + '\n}'

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(FILES_DIRECTORY, codeFile), code, error => {
                if (error)
                    reject(error)
                else {
                    fs.writeFile(path.join(FILES_DIRECTORY, inputFile), input, error => {
                        if (error)
                            reject(error)
                        else
                            resolve({ codeFile, inputFile })
                    })
                }
            })
        })
    }
}
let javacompiler = new JavaCompiler()


router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        let files = await javacompiler.storeCode('java', code, input)
        files.exeFile = files.codeFile.slice(0, files.codeFile.length - ('.java'.length))

        let output = await javacompiler.execute(COMPILE_COMMAND(files.codeFile), RUN_COMMAND(files.exeFile, files.inputFile))
        res.send(output)

        javacompiler.removeFile(files.codeFile)
        javacompiler.removeFile(files.exeFile + '.class')
        javacompiler.removeFile(files.inputFile)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router