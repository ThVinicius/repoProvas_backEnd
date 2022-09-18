import { Request, Response, NextFunction } from 'express'

function uploadPdf(req: Request, res: Response, next: NextFunction) {
  const msg = 'É necessário mandar um arquivo em pdf'

  if (req.file === undefined) return res.status(400).send(msg)

  if (req.file!.mimetype !== 'application/pdf') return res.status(400).send(msg)

  next()
}

export default uploadPdf
