exports.up = knex => knex.schema.createTable('dish', table => {
    table.increments('id');
    table.text('name').notNullable();
    table.decimal('price').notNullable();
    table.text('category').notNullable();
    table.text('description');
    table.text('img');    
    table.integer('user_id').references("id").inTable("users"); //verificar pois não precisar desse campo
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('dish');
