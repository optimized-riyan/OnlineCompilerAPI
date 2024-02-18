const { exec } = require("child_process");
const AbstractCompiler = require("./abstractcompiler");

class Compiler extends AbstractCompiler {
    constructor() {
        super();
    }

    async execute(compileCommand, runCommand) {
        // code to compile the sent program
        let compilerError = await new Promise((resolve) => {
            const process = exec(compileCommand, (error, stdout, stderr) => {
                if (error) resolve(error.message);
                else {
                    resolve();
                }
            });
        });

        // if there is an error at compile time, there is no running the executable,
        // hence this compiler error is returned
        if (compilerError)
            return new Promise((resolve) => resolve(compilerError));
        // run the program if no compile time errors
        else
            return new Promise((resolve, reject) => {
                // this process id is stored to be used for the timeout check
                const process = exec(runCommand, (error, stdout, stderr) => {
                    if (error) reject(error.message);
                    else resolve(stdout);
                });

                // to avoid the execution getting stuck in a loop
                this.timeoutCheck(process, reject);
            });
    }
}

module.exports = Compiler;
