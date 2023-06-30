const { exec } = require('child_process')
const fs = require('fs')

let TIMEOUT = 4000

class AbstractCompiler {

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
}

module.exports = AbstractCompiler