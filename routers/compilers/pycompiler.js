const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Interpreter = require('./interpreter');
const cors = require('cors');

const corsOptions = {
    origin: 'http://127.0.0.1:8000'
};
router.use(cors(corsOptions));

// the logic is same as explained the cppcompiler.js file, only that a few steps are omitted since python and
// other similar languages are loosely typed

let runCommand = (codeFile, inputFile) => {
    return 'python3 ./files/' + codeFile + ' < ./files/' + inputFile;
};

let interpreter = new Interpreter(runCommand, 'py');

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
