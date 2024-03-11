const CompilerRouter = require('../compilerRouter');
const Interpreter = require('./interpreter');

const router = new CompilerRouter().router;

let runCommand = (codeFile, inputFile) => {
    return 'php ./files/' + codeFile + ' < ./files/' + inputFile;
};

let interpreter = new Interpreter(runCommand, 'php');

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
