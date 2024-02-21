const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Compiler = require('./compiler');
const path = require('path');

let compileCommand = (codeFile, exeFile) => {
    return 'gcc ./files/' + codeFile + ' -o ./files/' + exeFile;
};
let runCommand = (exeFile, inputFile) => {
    return './files/' + exeFile + ' < ./files/' + inputFile;
};

let compiler = new Compiler(compileCommand, runCommand, 'c');

router.use(bodyParser.json());

router.post('/runtrivial', async (req, res) => {
    try {
        outputs = await compiler.runTrivial(
            req.body.code,
            req.body.testcases
        );
        res.json({ outputs });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
