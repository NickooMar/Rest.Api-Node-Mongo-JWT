import { Router } from 'express'
const router = Router();

import { signUp, logIn } from '../controllers/user.controller'


router.post('signup', signUp)
router.post('login', logIn)

export default router;