import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

function schemaValidator(schema: ObjectSchema, isParams: boolean = false) {
  let payload

  return (req: Request, res: Response, next: NextFunction) => {
    if (isParams) payload = req.params
    else payload = req.body

    const { error } = schema.validate(payload, { abortEarly: false })

    if (error) {
      return res.status(400).send(error.details.map(detail => detail.message))
    }

    return next()
  }
}

export default schemaValidator
