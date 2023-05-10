exports.up = knex => knex.schema.createTable('orderDish', table => {
    table.integer('quant').notNullable();
    table.integer('order_id').references('id').inTable('orders');
    table.integer('dish_id').references('id').inTable('dish');
});

exports.down = knex => knex.schema.dropTable('orderDish');

//excluir essa tabela pois n vai precisar