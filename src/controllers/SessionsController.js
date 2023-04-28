const knex  = require('../database/');
const AppError = require('../utils/AppError');
const {compare} = require('bcryptjs');
const authConfig =  require('../configs/auth');
const {sign} = require('jsonwebtoken');


class SessionsController{
    async create(req, res){
        const {email, password} = req.body;

        const user = await knex("users").where({email}).first();
        const passwordUser = await compare(password, user.password);

        if(!user || !passwordUser){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const {secret, expiresIn} = authConfig.jwt;

        const isAdmin = user.type === 'employee';

        const token = sign(
            { admin: isAdmin },
            secret,
            {
                subject: String(user.id),
                expiresIn,
            }
        );

        return res.json({user, token});
    };
}

module.exports = SessionsController;