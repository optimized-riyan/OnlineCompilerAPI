const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Interpreter = require("./interpreter");

let RUN_COMMAND = (codeFile, inputFile) => {
    return "php ./files/" + codeFile + " < ./files/" + inputFile;
};

class PHPInterpreter extends Interpreter {
    constructor() {
        super();
    }
}
let phpinterpreter = new PHPInterpreter();

router.use(bodyParser.json());

router.post("/", async (req, res) => {
    let code = req.body.code;
    let input = req.body.input;
    try {
        let files = await phpinterpreter.storeCode("php", code, input);

        let output = await phpinterpreter.execute(
            RUN_COMMAND(files.inputFile, files.codeFile)
        );
        res.send(output);

        phpinterpreter.removeFile(files.codeFile);
        phpinterpreter.removeFile(files.inputFile);
    } catch (e) {
        res.send(e);
        console.log(e);
    }
});

module.exports = router;
