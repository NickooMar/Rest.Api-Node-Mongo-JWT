//Con esto voy a definir metodos que utilizare para poder autenticar y volver a logear el usuario
import { Request, Response } from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'


function createToken(user: IUser) {                   //Importamos el archivo config desde config
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {       //Genera un token con los siguientes datos, y necesita la palabra clave que se importa desde config
        expiresIn: 86400 //Esto es cuanto queremos que dure el token, 1 dia
    });
}


//No reconoce el req y el res por eso importo { Request, Response } y le asigno ese valor al req y res

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Please. Send your email and password' })
    }
    const user = await User.findOne({ email: req.body.email }) //Busca por correo al usuario y devuelve el usuario
    if (user) {
        return res.status(400).json({ msg: 'The user already exist' });
    }

    const NewUser = new User(req.body);
    await NewUser.save(); //guarda el nuevo usuario en la base de datos.

    return res.status(201).json({ NewUser });
};

export const logIn = async (req:Request, res:Response) => {
    if(!req.body.email || req.body.password){
        return res.status(400).json({msg : "Please. Send your email and password"});
    }
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).json({msg: 'The user does not exists'});
    }
    const isMatch = await user.comparePassword()
    //Si isMatch  coincide con la contraseña me devolvera un token nuevo
    if (isMatch) {
        return res.status(200).json({token: createToken(user)}) //Genera un token con el usuario
    }
    //Si isMatch no coincide con la contraseña me devolvera un mensage de error
    return res.status(400).json({
        msg: "The email or password are incorrect"
    })
}