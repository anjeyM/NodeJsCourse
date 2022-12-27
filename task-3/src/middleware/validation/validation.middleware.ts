import {Request, Response, NextFunction} from "express";
import {errorResponse} from '../../shared/services/validation/validation.service';
//eslint-disable-next-line
export const validateSchema = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        })

        if(error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    }
}