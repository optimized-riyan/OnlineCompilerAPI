const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Interpreter = require('./interpreter');

let runCommand = (codeFile, inputFile) => {
    return 'php ./files/' + codeFile + ' < ./files/' + inputFile;
};

let interpreter = new Interpreter(runCommand, 'php');

router.use(bodyParser.json());

router.post('/runtrivial', async (req, res) => {
    try {
        outputs = await interpreter.runTrivial(
            req.body.code,
            req.body.testcases
        );
        res.json({ outputs });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
