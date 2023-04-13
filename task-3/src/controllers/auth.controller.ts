import {Request, Response} from "express";
import {User} from '../models';
import {sign, Secret} from 'jsonwebtoken';
import {logger} from '../shared/loggers/error-logger';

//** Login and creates a new token. */
export const login = async (req: Request, res: Response) => {
    const userLogin: string = req.body.login;
    const user = await User.findOne({
        attributes: [ 'id', 'login', 'isdeleted'],
        where: {login: userLogin}
    });

    if (!user) {
        logger.error('Error call login() (User not found) with args: %O', req.body);
        return res.status(403).send('User not found');
    }
    const payload  = {"id": user.id, "login": user.login, "isdeleted": user.isdeleted};
    const token = sign(payload, process.env.TOKEN_KEY as Secret, {expiresIn: 5000});

    return res.send(token);
};

