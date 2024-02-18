const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Interpreter = require("./interpreter");

// the logic is same as explained the cppcompiler.js file, only that a few steps are omitted since python and
// other similar languages are loosely typed

let RUN_COMMAND = (codeFile, inputFile) => {
    return "python3 ./files/" + codeFile + " < ./files/" + inputFile;
};

class PyInterpreter extends Interpreter {
    constructor() {
        super();
    }
}

let pyinterpreter = new PyInterpreter();

router.use(bodyParser.json());

router.post("/", async (req, res) => {
    let code = req.body.code;
    let input = req.body.input;
    try {
        let files = await pyinterpreter.storeCode("py", code, input);

        let output = await pyinterpreter.execute(
            RUN_COMMAND(files.codeFile, files.inputFile)
        );
        res.send(output);

        pyinterpreter.removeFile(files.codeFile);
        pyinterpreter.removeFile(files.inputFile);
    } catch (e) {
        res.send(e);
        console.log(e);
    }
});

module.exports = router;
