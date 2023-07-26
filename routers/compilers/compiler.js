const { exec } = require('child_process');
const AbstractCompiler = require('./abstractcompiler');

class Compiler extends AbstractCompiler {

    constructor() {
        super()
    }

    async execute(compileCommand, runCommand) {
        let compilerError = await new Promise(resolve => {
            const process = exec(compileCommand, (error, stdout, stderr) => {
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
                const process = exec(runCommand, (error, stdout, stderr) => {
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