//configurar el servidor
import express, { urlencoded }  from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from  './routes/auth.routes' //importo las rutas
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
import specialRoutes from './routes/special.routes'

//Initialization
const app = express();


//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


//routes
app.get('/', (req, res) => {
    res.send(`The API is at http://localhost:${app.get('port')}`)
});
app.use(authRoutes); //Le pedimos a app que utilice el enrutador authRoutes
app.use(specialRoutes);


export default app;