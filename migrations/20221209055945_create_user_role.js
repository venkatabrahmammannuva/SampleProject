/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("user_roles",(table)=>{
        table.increments();
        table.integer("user_id").notNullable()
                .unsigned()
                .references("id")
                .inTable("users");
        table.integer("role_id").notNullable()
                .unsigned()
                .references("id")
                .inTable("roles");
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("user_roles");
};
