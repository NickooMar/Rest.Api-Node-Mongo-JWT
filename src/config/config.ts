export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken', //codigo que me permite utilizar el jsonwebtoken si no defino JWT_SECRET entonces utiliza lo ''
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/jwtmongorest', //Si existe una variable de entorno llamada MONGODB_URI utilizala sino utiliza esa base de datos local
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}