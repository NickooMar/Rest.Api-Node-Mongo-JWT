import mongoose, { ConnectionOptions } from 'mongoose' //importa la interfaz de connectionOptions
import config from './config/config'

const dbOptions: ConnectionOptions = {              //los dos puntos y el connection options permite el autocompletado
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(config.DB.URI, dbOptions) //Estoy conectandome a mongo db mediante la uri ya que no defini la variable de entorno


const connection = mongoose.connection;

connection.once('open', () => {            //cuando la conexion se ejecute imprime por consola lo siguiente
    console.log('Mongodb Connection stablished');
});

connection.on('error', err => {
    console.log(err);           //Si ocurre algun error al ejecutar la conexion imprime ese error
    process.exit(0);            //con esto terminamos la ejecucion del programa
});
