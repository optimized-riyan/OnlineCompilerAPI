const CompilerRouter = require('../compilerRouter');
const Interpreter = require('./interpreter');

// the logic is same as explained the cppcompiler.js file, only that a few steps are omitted since python and
// other similar languages are loosely typed

const router = new CompilerRouter().router;

let runCommand = (codeFile, inputFile) => {
    return 'python3 ./files/' + codeFile + ' < ./files/' + inputFile;
};

const interpreter = new Interpreter(runCommand, 'py');

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
