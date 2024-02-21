const fs = require('fs');
const path = require('path');

let TIMEOUT = 10000;
let CHARACTERS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789A';
let FILES_DIRECTORY = './files';

class AbstractCompiler {
    // This function will be used to generate random names for files
    // This is necessary to ensure multiple users can submit the programs to be run
    generateRandomName(length) {
        let result = '';
        let randomPosition = 0;
        for (let i = 0; i < length; i++) {
            randomPosition = Math.floor(Math.random() * CHARACTERS.length);
            result += CHARACTERS[randomPosition];
        }
        return result;
    }

    // This timeout will be used to ensure the executing thread does not get stuck in a loop in case of a looping program
    timeoutCheck(process, reject) {
        const timeoutId = setTimeout(() => {
            process.kill();
            reject('TIME LIMIT EXCEEDED');
        }, TIMEOUT);

        process.on('exit', () => {
            clearTimeout(timeoutId);
        });
    }

    // Abstract function, its implementation depends on the language being strictly or loosely typed
    execute() {
        throw new Error('Not defined');
    }

    // Used to store files
    storeCode(extension, code) {
        let codeFile = this.generateRandomName(20) + '.' + extension;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(FILES_DIRECTORY, codeFile),
                code,
                (error) => {
                    if (error) reject(error);
                    else resolve(codeFile);
                }
            );
        });
    }

    storeInput(input) {
        let inputFile = this.generateRandomName(20) + '.txt';

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(FILES_DIRECTORY, inputFile),
                input,
                (error) => {
                    if (error) reject(error);
                    else resolve(inputFile);
                }
            );
        });
    }

    // Used to delete files
    removeFile(filename) {
        fs.unlink(path.join(FILES_DIRECTORY, filename), (error) => {
            if (error) console.error(error);
        });
    }
}

module.exports = AbstractCompiler;
