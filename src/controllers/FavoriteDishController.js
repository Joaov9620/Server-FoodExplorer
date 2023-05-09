const knex = require('../database');

class FavoriteDishController{
    async create(req, res){
        const {user_id, dish_id} = req.body;

        await knex('favoriteDish').insert({user_id, dish_id});

        res.status(201).json();
    }

    async delete(req, res){
        const {user_id, dish_id} = req.body;
        
        await knex('favoriteDish').where({user_id, dish_id}).delete();
        
        return res.json();
    }
    
    async index(req, res){
        const user_id = req.query.user_id;
        const {name} = req.query;

        let dish = await knex('dish').orderBy('name');

        const favoriteDish = await knex('favoriteDish')
        .select('*')
        .where('favoriteDish.user_id', user_id)
        .whereIn('dish_id', dish.map(dish => dish.id))

        const dishList = dish.map(dish => {
            const isFavorite = !!favoriteDish.find(fav => fav.dish_id === dish.id);
            return {...dish, isFavorite};
        });

        if(name){
            const filteredDishList = dish.filter(dish => dish.name.toLowerCase().includes(name.toLowerCase()));
            if(filteredDishList.length){
                return res.json(filteredDishList);
            }else{
                dish = await knex
                .select('d.*')
                .from('dish as d')
                .join('ingredients as i', 'd.id', 'i.dish_id')
                .whereLike('d.name', `%${name}%`)
                .orWhereLike('i.name', `%${name}%`)
                .groupBy('d.id');

                return res.json(dish);
            }
        }else{
            return res.json(dishList);
        }
    }  

};

module.exports = FavoriteDishController;