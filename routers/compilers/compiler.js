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
        let compilerError = await new Promise((resolve) => {
            exec(compileCommand, (error, stdout, stderr) => {
                if (error) resolve(error.message);
                else {
                    resolve();
                }
            });
        });

        // if there is an error at compile time, there is no running the executable,
        // hence this compiler error is returned
        if (compilerError)
            return new Promise((resolve, reject) => reject(compilerError));
        // run the program if no compile time errors
        else
            return new Promise((resolve, reject) => {
                // this process id is stored to be used for the timeout check
                const process = exec(runCommand, (error, stdout, stderr) => {
                    if (error) reject(error.message);
                    else if (stderr) reject(stderr);
                    else resolve(stdout);
                });

                // to avoid the execution getting stuck in a loop
                this.timeoutCheck(process, reject);
            });
    }

    async runTrivial(code, testcases) {
        return new Promise(async (resolve, reject) => {
            try {
                let codeFile = await this.storeCode(this.extension, code);
                let exeFile = codeFile.slice(
                    0,
                    codeFile.length - '.c'.length
                );

                let outputs = [];
                for (const testcase of testcases) {
                    let inputFile = await this.storeInput(testcase);
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
            }
        });
    }
}

module.exports = Compiler;
