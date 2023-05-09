exports.up = knex => knex.schema.createTable('favoriteDish ', table => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users');
    table.integer('dish_id').references('id').inTable('dish');
});

exports.down = knex => knex.schema.dropTable('favoriteDish');