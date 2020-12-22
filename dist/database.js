"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose")); //importa la interfaz de connectionOptions
const config_1 = __importDefault(require("./config/config"));
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose_1.default.connect(config_1.default.DB.URI, dbOptions); //Estoy conectandome a mongo db mediante la uri ya que no defini la variable de entorno
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Mongodb Connection stablished');
});
connection.on('error', err => {
    console.log(err); //Si ocurre algun error al ejecutar la conexion imprime ese error
    process.exit(0); //con esto terminamos la ejecucion del programa
});
