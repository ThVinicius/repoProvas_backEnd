"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uploadPdf(req, res, next) {
    const msg = 'É necessário mandar um arquivo em pdf';
    if (req.file === undefined)
        return res.status(400).send(msg);
    if (req.file.mimetype !== 'application/pdf')
        return res.status(400).send(msg);
    next();
}
exports.default = uploadPdf;
