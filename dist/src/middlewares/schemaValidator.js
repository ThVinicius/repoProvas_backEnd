"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function schemaValidator(schema, isParams = false) {
    let payload;
    return (req, res, next) => {
        if (isParams)
            payload = req.params;
        else
            payload = req.body;
        const { error } = schema.validate(payload, { abortEarly: false });
        if (error) {
            return res.status(400).send(error.details.map(detail => detail.message));
        }
        return next();
    };
}
exports.default = schemaValidator;
