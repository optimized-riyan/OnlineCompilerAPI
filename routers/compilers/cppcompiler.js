const CompilerRouter = require('../compilerRouter');
const Compiler = require('./compiler');

const router = new CompilerRouter().router;

// this command is going to be different for files with different names, hence its made into a function
let compileCommand = (codeFile, exeFile) => {
    return 'g++ ./files/' + codeFile + ' -o ./files/' + exeFile;
};
// same as above
let runCommand = (exeFile, inputFile) => {
    return './files/' + exeFile + ' < ./files/' + inputFile;
};

// This instantiation of a child of the Compiler class is useful if we need to use
// polymorphism, to create different definitions of parent's functions
const compiler = new Compiler(compileCommand, runCommand, 'cpp');

router.post('/runtrivial', async (req, res) => {
    try {
        outputs = await compiler.runTrivial(req.body.code, req.body.testcases);
        res.json({ outputs });
    } catch (error) {
        if (error.message)
            res.json({ error: error.message });
        else
            res.json({ error });
    }
});

module.exports = router;
