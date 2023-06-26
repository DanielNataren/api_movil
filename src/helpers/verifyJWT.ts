import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken"
import User from "../modules/users/infrastructure/models/user.model";
import UserRepository from '../modules/users/infrastructure/user.infrastructure';


export const validateJWT = async( req: Request, res: Response, next: NextFunction ) => {
    const authorization = req.header('Authorization');
    
    const token = authorization ? authorization.split(' ')[1] : false;

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try{
        const user = await verifyJWT(token);
        if(!user){
            return res.status(401).json({
                msg:'Token no valido - usuario no existente en DB'
            });
        }
        req.body.user = {...user}
        next();
    }catch(err){
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

export const verifyJWT = async(token: string): Promise<User> => {
    try {
        const jwtV = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (typeof jwtV === 'object'){
            const uid = jwtV.uid;
            const user = await UserRepository.getUser(Number(uid));
            if (!user) {
                return null;
            }
            return user;
        }
    } catch (error) {
        return null;
    }
}