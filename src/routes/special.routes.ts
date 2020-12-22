import {Router, response} from 'express'
const router = Router();

import passport from 'passport'

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('success');
}) //Para acceder a special una vez llegue una peticion primero sera validado por esa funcion y si es correcto seguira

export default router