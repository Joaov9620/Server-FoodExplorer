const knex = require('../database');

class DishController{
    async create(req, res){
        const {name, price, description, ingredients, category} = req.body;

        const [dish_id] = await knex('dish').insert({
            name,
            price,
            description,
            category,
        });

        const ingredientsInsert = ingredients.map(name => {
            return{
                dish_id,
                name
            }
        });

        await knex('ingredients').insert(ingredientsInsert);

        res.status(201).json();
    };

    async show(req, res){
        const {id} = req.params;

        const dish = await knex('dish').where({id}).first(); //verificar a parte do first se precisa 
        const ingredients = await knex('ingredients').where({dish_id: id}).orderBy('name');

        return res.json({
            ...dish,
            ingredients
        })
    };
    
    async delete(req, res){
        const {id} = req.params;
        
        await knex('dish').where({id}).delete();
        
        return res.json();
    };

    async index(req, res){
        // const {name, ingredients} = req.query;
        // let dish;
        const dish = await knex('dish').orderBy('name');
        // if(ingredients){
        //     const filterIngredients = ingredients
        //     .split(',').map(ingredient =>ingredient.trim());
           
        //     dish = await knex('ingredients')
        //     .select([
        //         'dish.id',
        //         'dish.name',
        //     ])
        //     .whereLike('dish.name', `%${name}%`)
        //     .whereIn('ingredients.name', filterIngredients)
        //     .innerJoin('dish', 'dish.id', 'ingredients.dish_id')

        // }else{
        //     dish = await knex('dish')
        //     .whereLike('name', `%${name}%`)
        //     .orderBy('name');
        // }

        return res.json(dish);
    }; //rever essa parte pois os parametros vai junto no inpu
}

module.exports = DishController;