const { exec } = require('child_process');
const AbstractCompiler = require('./abstractcompiler');

class Interpreter extends AbstractCompiler {
    constructor(runCommand, extension) {
        super();
        this.runCommand = runCommand;
        this.extension = extension;
    }

    execute(consoleCommand) {
        return new Promise((resolve, reject) => {
            // this process id is stored to be used for the timeout check
            const process = exec(consoleCommand, (error, stdout, stderr) => {
                if (error) reject(error);
                else if (stderr) reject(stderr);
                else resolve(stdout);
            });

            // to avoid infinite loop
            this.timeoutCheck(process, reject);
        });
    }

    async runTrivial(code, testcases) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!testcases || testcases.length == 0) reject(new Error('No testcases were found'));

                let codeFile = await this.storeCode(this.extension, code);
                let outputs = [];
                for (const testcase of testcases) {
                    let inputFile = await this.storeInput(testcase);
                    let output = await this.execute(
                        this.runCommand(codeFile, inputFile)
                    );
                    outputs.push(output);
                    this.removeFile(inputFile);
                }
                this.removeFile(codeFile);
                resolve(outputs);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Interpreter;
