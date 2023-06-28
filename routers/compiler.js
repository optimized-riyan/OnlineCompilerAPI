const { exec } = require('child_process')
const { stderr, stdout } = require('process')
const fs = require('fs')

class Compiler {
    constructor(lang, runCommand) {
        this.ref = this
        this.lang = lang
        this.runCommand = runCommand
    }

    constructor(lang, runCommand, compileCommand) {
        this(lang, runCommand)
        this.compileCommand = compileCommand
    }

    [timeoutCheck](process, promise) {
        const timeoutId = setTimeout(() => {
            process.kill()
            promise.reject('TIME LIMIT EXCEEDED')
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

    run() {
        throw new Error('Not defined')
    }

    directOutput() {
        new Promise((resolve, reject) => {
            
            const process = exec(ref.runCommand, (error, stdout, stderr) => {
                if (error)
                    reject(error)
                else
                    resolve({ stdout, stderr })
            })

            timeoutCheck(process, this)

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
            const process = exec(ref.compileCommand, (error, stdout, stderr) => {
                if (error)
                    reject(error)
                else
                    resolve({ stdout, stderr })
            })
            
            ref.timeoutCheck(process, this)

        }).then(resolution => {
            if (!stderr) {
                new Promise((resolve, reject) => {
                    const process = exec(ref.runCommand, (error, stdout, stderr) => {
                        if (error)
                            reject(error)
                        else
                            resolve({ stdout, stderr })
                    })

                    ref.timeoutCheck(process, this)

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