import { Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import config  from "../config/config"; //Importo todo el archivo de configuracion para obtener la llave de jwtsecret
import User from '../models/user'

const opts: StrategyOptions = {    //Estoy diciendo que esta constante es de tipo StrategyOptions
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

 
export default new Strategy(opts, async (payload,done) => {
    try{
        const user = await User.findById(payload.id) //Si el usuario por id lo obtengo basado en los datos del token me devolvera un usuario
    if(user) {
        return done(null, user); //Devuelvo un null de error y el usuario si lo encuentra
    }
    return done(null, false) //Si no lo encuentra devuelvo null de error y no devuelvo nada
    } catch(error){
        console.log(error)
    }
});         //El payload es el objeto que guardamos cuando logeamos un usuario