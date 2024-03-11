const { Router } = require('express');
const cors = require('cors');
const { json: bodyParserJson } = require('body-parser');

class CompilerRouter {
    constructor(corsOptions = { origin: 'http://127.0.0.1' }) {
        this.router = Router();
        this.router.use(bodyParserJson());
        this.router.use(cors(corsOptions));
    }
}

module.exports = CompilerRouter;