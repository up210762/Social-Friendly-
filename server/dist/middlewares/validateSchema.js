"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            console.log(req.body);
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorsMessage = error.errors.map(issue => ({
                    message: `${issue.path.join(' ')} is ${issue.message}`
                }));
                res.status(400).json({ message: 'Invalid Data', details: errorsMessage });
            }
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map