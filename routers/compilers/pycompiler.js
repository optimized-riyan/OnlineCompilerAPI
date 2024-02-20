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

router.get('/', async (req, res) => {
    try {
        let dbQuery = async () => {
            return new Promise((resolve, reject) => {
                conn.query('select * from problems', (queryErr, data) => {
                    if (queryErr) {
                        reject(queryErr);
                    } else resolve(data);
                });
            });
        };

        res.json(await dbQuery());
    } catch (queryErr) {
        console.error(queryErr);
        res.send('There has been an error in the query');
    }
});

router.post('/', async (req, res) => {
    let code = req.body.code;
    let input = req.body.input;
    try {
        let files = await pyinterpreter.storeCode('py', code, input);

        let output = await pyinterpreter.execute(
            RUN_COMMAND(files.codeFile, files.inputFile)
        );
        res.json({ output });

        pyinterpreter.removeFile(files.codeFile);
        pyinterpreter.removeFile(files.inputFile);
    } catch (e) {
        res.json({ error: e });
    }
});

module.exports = router;
