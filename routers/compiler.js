const { exec } = require('child_process')
const { stderr, stdout } = require('process')
const fs = require('fs')
const { resolve } = require('path')

let TIMEOUT = 4000

class Compiler {

    constructor(compileCommand, runCommand) {
        this.compileCommand = compileCommand
        this.runCommand = runCommand
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

    storeCode(filepath, code) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, code, error => {
                if (error)
                    reject(error)
                else
                    resolve('File written successfully')
            })
        })
    }

    execute() {
        throw new Error('Not defined')
    }

    directRun() {
        new Promise((resolve, reject) => {
            
            const process = exec(this.runCommand, (error, stdout, stderr) => {
                if (error)
                    reject(error)
                else
                    resolve({ stdout, stderr })
            })

            timeoutCheck(process, reject)

        })
        .then(resolve => {
            if (resolve.stdout)
                return resolve.stdout
            else
                return resolve.stderr
        })
        .catch(rejection => {
            return rejection
        })
    }

    async compileAndRun() {
        let compilerError = await new Promise(resolve => {
            const process = exec(this.compileCommand, (error, stdout, stderr) => {
                if (error)
                    resolve(error.message)
                else {
                    resolve()
                }
            })
        })

        if (compilerError)
            return new Promise(resolve => resolve(compilerError))
        else
            return new Promise((resolve, reject) => {
                const process = exec(this.runCommand, (error, stdout, stderr) => {
                    if (error)
                        reject(error.message)
                    else
                        resolve(stdout)
                })

                this.timeoutCheck(process, reject)
            })
    }
}

module.exports = Compiler