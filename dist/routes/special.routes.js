"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const passport_1 = __importDefault(require("passport"));
router.get('/special', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.send('success');
}); //Para acceder a special una vez llegue una peticion primero sera validado por esa funcion y si es correcto seguira
exports.default = router;
