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
}

module.exports = AbstractCompiler