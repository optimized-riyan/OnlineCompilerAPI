const CompilerRouter = require('../compilerRouter');
const Compiler = require('./compiler');

const router = new CompilerRouter().router;

let compileCommand = (codeFile, exeFile) => {
    return 'gcc ./files/' + codeFile + ' -o ./files/' + exeFile;
};
let runCommand = (exeFile, inputFile) => {
    return './files/' + exeFile + ' < ./files/' + inputFile;
};

let compiler = new Compiler(compileCommand, runCommand, 'c');

router.post('/runtrivial', async (req, res) => {
    try {
        outputs = await compiler.runTrivial(
            req.body.code,
            req.body.testcases
        );
        res.json({ outputs });
    } catch (error) {
        if (error.message)
            res.json({ error: error.message });
        else
            res.json({ error });
    }
});

module.exports = router;
