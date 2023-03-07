/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("users",(table)=>{
        table.increments();
        table.string("first_name").defaultTo(null);
        table.string("last_name").defaultTo(null);
        table.string("email").notNullable();
        table.specificType('salt', 'varchar(512)').notNullable();
        table.specificType('password_hash', 'varchar(512)').notNullable();
        table.date('date_of_birth').nullable().defaultTo(null);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("users");
};
