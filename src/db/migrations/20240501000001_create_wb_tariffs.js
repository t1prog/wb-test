/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("wb_tariffs", (table) => {
        table.date("date").notNullable();
        table.string("warehouse_name").notNullable();
        table.string("geo_name").notNullable();

        table.decimal("delivery_base", 10, 4).notNullable();
        table.integer("delivery_coef").notNullable();
        table.decimal("delivery_liter", 10, 4).notNullable();

        table.decimal("marketplace_base", 10, 4).notNullable();
        table.integer("marketplace_coef").notNullable();
        table.decimal("marketplace_liter", 10, 4).notNullable();

        table.decimal("storage_base", 10, 4).notNullable();
        table.integer("storage_coef").notNullable();
        table.decimal("storage_liter", 10, 4).notNullable();

        table.primary(["date", "warehouse_name"]);

        table.index(["date"], "idx_wb_tariffs_date");
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("wb_tariffs");
}
