const knex = require('../database');
const AppError = require("../utils/AppError");

class DishController{
    async create(req, res) {
        const { name, price, description, ingredients, category} = req.body;
        let img = null;
        if(req.file){
            img = req.file.fileName;
        }
        const dishExists = await knex('dish').where({ name }).first();
        if (dishExists) {
          throw new AppError('Este prato já existe!');
        } 
      
        const [dish_id] = await knex('dish').insert({
          name,
          price,
          description,
          category,
          img: img
        });
      
        const ingredientsInsert = ingredients.map(name => ({
          dish_id,
          name,
        }));
      
        await knex('ingredients').insert(ingredientsInsert);
      
        res.status(201).json();
    }
      

    async update(req, res){
        const {name, price, description, ingredients, category} = req.body;
        const {id} = req.params;

        const dish = await knex('dish').where({ id }).first();
        if (!dish) {
            throw new AppError('Prato não encontrado!');
        }

        if (name !== dish.name) {
            const checkNameExists = await knex('dish').where({ name }).first();
            if (checkNameExists) {
              throw new AppError('Este prato já existe!');
            }
        }

        //Atualizar o prato
        await knex('dish').where({ id: id }).update({
          name: name,
          price: price,
          description: description,
          category: category
        });

        // Seleciona os ingredientes existentes do prato
        const existingIngredients = await knex('ingredients')
        .where({ dish_id: id })
        .select('id', 'name');
        
        //Cria uma lista de novos ingredientes que precisam ser adicionados
        const newIngredients = ingredients.filter(ingredient => {
            return !existingIngredients.some(existingIngredient =>{
                return existingIngredient.name === ingredient
            });
        }).map(ingredient => {
            return {
                dish_id: id,
                name: ingredient
            }
        })

        // Cria uma lista de ingredientes existentes que precisam ser removidos
        const removedIngredients = existingIngredients.filter(existingIngredient => {
            return !ingredients.includes(existingIngredient.name);
            }).map(existingIngredient => {
                return existingIngredient.id;
            }
        );

        //Adiciona novos ingredientes
        if(newIngredients.length > 0) {
            await knex('ingredients').insert(newIngredients);
        }

        // // Remove ingredientes existentes
        if(removedIngredients.length > 0) {
            await knex('ingredients').whereIn('id', removedIngredients).delete();
        }

        res.status(201).json();
    }

    async show(req, res){
        const {id} = req.params;

        const dish = await knex('dish').where({id}).first();
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
        const {name} = req.query;
        let dish = await knex('dish').orderBy('name');

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
            return res.json(dish);
        }   
    };
}

module.exports = DishController;