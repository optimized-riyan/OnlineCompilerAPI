const { exec } = require('child_process');
const AbstractCompiler = require('./abstractcompiler');

class Interpreter extends AbstractCompiler {
    constructor(runCommand) {
        super()
        this.runCommand = runCommand
    }

    execute() {
        return new Promise((resolve, reject) => {
            
            const process = exec(this.runCommand, (error, stdout, stderr) => {
                if (error)
                    resolve(error.message)
                else
                    resolve(stdout)
            })

            timeoutCheck(process, reject)

        })
    }
}

module.exports = Interpreter