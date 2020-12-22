import { model, Schema, Document } from 'mongoose'
import bcrypt, { hash } from 'bcrypt'

export interface IUser extends Document{              //Define que datos estoy guardando para obtener un autocompletado
    email: string;                                    //El extends de document permite que el objeto herede sus propiedades
    password: string;
    comparePassword: () => Promise<boolean>  //Defino el metodo compare password para poder utilizarlo en otros archivos
}

const userSchema = new Schema({
    email: {type: String, required:true, unique:true, lowercase:true, trim: true}, //unique: tiene que ser unico, trim:que pasen un correo con espacio al inicio y al final
    password: {type: String, required:true}
});

userSchema.pre<IUser>('save', async function(next){        //El <IUser> me permite que detecte el password del usuario
    const user = this;
    if(!user.isModified('password')) return next()    //Comprueba si el usuario a sido modificado, es decir, si el usuario no es nuevo

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt) // Desde bcrypt toma su funcion hash con la contraseña del usuario y la contaseña pasada por el algoritmo
    user.password = hash;
    next();
});        //Metodo que se ejecuta antes de guardar un dato

userSchema.methods.comparePassword = async function (password: String): Promise<boolean> { //Define que basado en una promesa devolvera un booleano //Usar funciones con ES5 me permite acceder al objeto userSchema
    return await bcrypt.compare(password, this.password);
};  

export default model<IUser>('User', userSchema);         //este modelo va a estar basado = <IUser>