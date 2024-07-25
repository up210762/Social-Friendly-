"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (request, response) => {
    response.send('Soy Rogelio');
});
router.get('/:name', (req, res) => {
    const { name } = req.params;
    const { type } = req.query;
    console.log({ name, type });
    res.send('Enviado!!!');
});
router.get('/ping', (req, res) => {
    res.status(200).send(req.headers);
});
exports.default = router;
//# sourceMappingURL=routes.js.map