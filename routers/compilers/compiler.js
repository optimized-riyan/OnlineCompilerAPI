const { exec } = require('child_process');
const AbstractCompiler = require('./abstractcompiler');

class Compiler extends AbstractCompiler {
    constructor(compileCommand, runCommand, extension) {
        super();
        this.compileCommand = compileCommand;
        this.runCommand = runCommand;
        this.extension = extension;
    }

    async execute(compileCommand, runCommand) {
        // code to compile the sent program
        return new Promise(async (resolve, reject) => {
            await new Promise((resolve) => {
                exec(compileCommand, (error, stdout, stderr) => {
                    if (error) reject(error);
                    else resolve();
                });
            });

            const process = exec(runCommand, (error, stdout, stderr) => {
                if (error) reject(error.message);
                else if (stderr) reject(stderr);
                else resolve(stdout);
            });

            // to avoid the execution getting stuck due to a loop
            this.timeoutCheck(process, reject);
        });
    }

    async runTrivial(code, testcases) {
        return new Promise(async (resolve, reject) => {
            let codeFile, exeFile, inputFile;
            try {
                codeFile = await this.storeCode(this.extension, code);
                exeFile = codeFile.slice(0, codeFile.length - '.c'.length);

                let outputs = [];
                for (const testcase of testcases) {
                    inputFile = await this.storeInput(testcase);
                    let output = await this.execute(
                        this.compileCommand(codeFile, exeFile),
                        this.runCommand(exeFile, inputFile)
                    );
                    outputs.push(output);
                    this.removeFile(inputFile);
                }
                resolve(outputs);

                this.removeFile(codeFile);
                this.removeFile(exeFile);
            } catch (error) {
                reject(error);
            } finally {
                this.removeIfExists([codeFile, exeFile, inputFile]);
            }
        });
    }
}

module.exports = Compiler;
