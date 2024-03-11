const CompilerRouter = require('../compilerRouter');
const Compiler = require("./compiler");
const fs = require("fs");

const router = new CompilerRouter().router;

// the code differs from the cpp compiler in few places, these are described in the comments below

let COMPILE_COMMAND = (codeFile) => {
    return "javac -d ./files ./files/" + codeFile;
};
let RUN_COMMAND = (exeFile, inputFile) => {
    return "java -cp ./files " + exeFile + " < ./files/" + inputFile;
};
let FILES_DIRECTORY = "./files";

class JavaCompiler extends Compiler {
    constructor() {
        super();
    }

    // this custom function is required for java
    storeCode(extension, code, input) {
        let codeFile = this.generateRandomName(20) + "." + extension;
        let inputFile = this.generateRandomName(20) + ".txt";

        // this is a necessary step so different java files can be executed asynchronously
        code =
            "public class " +
            codeFile.slice(0, codeFile.length - extension.length - 1) +
            " {\n" +
            code +
            "\n}";

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(FILES_DIRECTORY, codeFile),
                code,
                (error) => {
                    if (error) reject(error);
                    else {
                        fs.writeFile(
                            path.join(FILES_DIRECTORY, inputFile),
                            input,
                            (error) => {
                                if (error) reject(error);
                                else resolve({ codeFile, inputFile });
                            }
                        );
                    }
                }
            );
        });
    }
}
let javacompiler = new JavaCompiler();

router.post("/", async (req, res) => {
    let code = req.body.code;
    let input = req.body.input;
    try {
        let files = await javacompiler.storeCode("java", code, input);
        files.exeFile = files.codeFile.slice(
            0,
            files.codeFile.length - ".java".length
        );

        let output = await javacompiler.execute(
            COMPILE_COMMAND(files.codeFile),
            RUN_COMMAND(files.exeFile, files.inputFile)
        );
        res.send(output);

        javacompiler.removeFile(files.codeFile);
        // the .class exetension is the way the exe file is stored in
        javacompiler.removeFile(files.exeFile + ".class");
        javacompiler.removeFile(files.inputFile);
    } catch (e) {
        res.send(e);
        console.log(e);
    }
});

module.exports = router;
