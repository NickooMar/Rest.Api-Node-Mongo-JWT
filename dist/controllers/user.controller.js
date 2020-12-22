"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400 //Esto es cuanto queremos que dure el token, 1 dia
    });
}
//No reconoce el req y el res por eso importo { Request, Response } y le asigno ese valor al req y res
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Please. Send your email and password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email }); //Busca por correo al usuario y devuelve el usuario
    if (user) {
        return res.status(400).json({ msg: 'The user already exist' });
    }
    const NewUser = new user_1.default(req.body);
    yield NewUser.save(); //guarda el nuevo usuario en la base de datos.
    return res.status(201).json({ NewUser });
});
exports.logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || req.body.password) {
        return res.status(400).json({ msg: "Please. Send your email and password" });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: 'The user does not exists' });
    }
    const isMatch = yield user.comparePassword();
    //Si isMatch  coincide con la contraseña me devolvera un token nuevo
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) }); //Genera un token con el usuario
    }
    //Si isMatch no coincide con la contraseña me devolvera un mensage de error
    return res.status(400).json({
        msg: "The email or password are incorrect"
    });
});
