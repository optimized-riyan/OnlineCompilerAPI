const { exec } = require('child_process')
const { stderr, stdout } = require('process')
const fs = require('fs')

// const timeoutCheck = Symbol('timeoutCheck')
class Compiler {

    constructor(compileCommand, runCommand) {
        this.ref = this
        this.compileCommand = compileCommand
        this.runCommand = runCommand
    }

    timeoutCheck(process, reject) {
        const timeoutId = setTimeout(() => {
            process.kill()
            reject('TIME LIMIT EXCEEDED')
        }, 10000)

        process.on('exit', () => {
            clearTimeout(timeoutId)
        })
    }


    storeCode(filepath, code) {
        fs.writeFile(filepath, code, error => {
            if (error)
                console.error(error)
            else
                console.log('Text written to the file successfully')
        })
    }

    execute() {
        throw new Error('Not defined')
    }

    directRun() {
        new Promise((resolve, reject) => {
            
            const process = exec(ref.runCommand, (error, stdout, stderr) => {
                if (error)
                    reject(error)
                else
                    resolve({ stdout, stderr })
            })

            timeoutCheck(process, reject)

        }).then(resolution => {
            if (resolution.stdout)
                return resolution.stdout
            else
                return resolution.stderr
        }).catch(rejection => {
            return rejection
        })
    }

    compileAndRun() {
        new Promise((resolve, reject) => {
            const process = exec(this.compileCommand, (error, stdout, stderr) => {
                if (error)
                    reject(error)
                else
                    resolve({ stdout, stderr })
            })
            
            this.timeoutCheck(process, reject)

        }).then(resolution => {
            if (!stderr) {
                new Promise((resolve, reject) => {
                    const process = exec(this.runCommand, (error, stdout, stderr) => {
                        if (error)
                            reject(error)
                        else
                            resolve({ stdout, stderr })
                    })

                    this.timeoutCheck(process, reject)

                }).then(resolution => {
                    if (resolution.stdout)
                        return resolution.stdout
                    
                    if (resolution.stderr)
                        return resolution.stderr
                }).catch(rejection => {
                    return rejection
                })
            }
        }).catch(rejection => {
            console.error(rejection)
        })
    }
}

module.exports = Compiler