const fs = require('fs')
const path = require('path')

let TIMEOUT = 10000
let CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789A'
let FILES_DIRECTORY = './files'

class AbstractCompiler {

    generateRandomName(length) {
        let result = ''
        let randomPosition = 0
        for (let i = 0; i < length; i++) {
            randomPosition = Math.floor(Math.random() * CHARACTERS.length)
            result += CHARACTERS[randomPosition]
        }
        return result
    }

    timeoutCheck(process, reject) {
        const timeoutId = setTimeout(() => {
            process.kill()
            reject('TIME LIMIT EXCEEDED')
        }, TIMEOUT)

        process.on('exit', () => {
            clearTimeout(timeoutId)
        })
    }

    execute() {
        throw new Error('Not defined')
    }

    storeCode(extension, code, input) {
        let codeFile = this.generateRandomName(20)  + '.' + extension
        let inputFile = this.generateRandomName(20) + '.txt'

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

    removeFile(filename) {
        fs.unlink(path.join(FILES_DIRECTORY, filename), error => {
            if (error) 
                console.error(error)
        })
    }
}

module.exports = AbstractCompiler