const { exec } = require("child_process");
const AbstractCompiler = require("./abstractcompiler");

class Interpreter extends AbstractCompiler {
    constructor() {
        super();
    }

    execute(runCommand) {
        return new Promise((resolve, reject) => {
            // this process id is stored to be used for the timeout check
            const process = exec(runCommand, (error, stdout, stderr) => {
                if (error) resolve(error.message);
                else if (stderr) reject(stderr);
                else resolve(stdout);
            });

            // to avoid infinite loop
            this.timeoutCheck(process, reject);
        });
    }
}

module.exports = Interpreter;
