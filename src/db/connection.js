import knexConfig from "#config/knex/knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

export default db;
