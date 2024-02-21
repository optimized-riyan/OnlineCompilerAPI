const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Interpreter = require('./interpreter');
const conn = require('../../db');

// the logic is same as explained the cppcompiler.js file, only that a few steps are omitted since python and
// other similar languages are loosely typed

let RUN_COMMAND = (codeFile, inputFile) => {
    return 'python3 ./files/' + codeFile + ' < ./files/' + inputFile;
};

class PyInterpreter extends Interpreter {
    constructor() {
        super();
    }
}

let pyinterpreter = new PyInterpreter();

router.use(bodyParser.json());

router.post('/run', async (req, res) => {
    let codeFile;
    try {
        let code = req.body.code;
        let testcases = req.body.testcases;

        codeFile = await pyinterpreter.storeCode('py', code);
        let outputs = [];
        for (const testcase of testcases) {
            let inputFile = await pyinterpreter.storeInput(testcase);
            let output = await pyinterpreter.execute(
                RUN_COMMAND(codeFile, inputFile)
            );
            outputs.push(output);
            pyinterpreter.removeFile(inputFile);
        }

        res.json({ outputs });
    } catch (error) {
        res.json({ error });
    }

    try {
        pyinterpreter.removeFile(codeFile);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
