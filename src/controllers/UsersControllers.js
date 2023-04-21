const { hash} = require("bcryptjs");
const knex = require('../database');
const AppError = require('../utils/AppError');

class UsersController{
    async create(req, res){
        const {name, password, email, type} = req.body;
        const passwordCryptographed = await hash(password, 8)

        const checkUsersExists = await knex('users').where({email});

        if(checkUsersExists.length>0){
            throw new AppError("Este e-mail já está em uso.", 409);
        }
    
        await knex('users').insert({
            name,
            password : passwordCryptographed,
            email,
            type
        });

        return res.status(201).json();
    }
};

module.exports = UsersController;