import env from "#config/env.js";
import { z } from "zod";

const connectionSchema = z.object({
    host: z.union([z.undefined(), z.string()]),
    port: z.union([z.string(), z.number()]).transform((value) => parseInt(String(value))),
    user: z.string(),
    password: z.string(),
    database: z.string(),
});

const NODE_ENV = env.NODE_ENV ?? "development";

const config = {
    development: {
        client: "pg",
        connection: () => {
            return connectionSchema.parse({
                host: env.POSTGRES_HOST ?? "localhost",
                port: env.POSTGRES_PORT ?? "5432",
                user: env.POSTGRES_USER ?? "postgres",
                password: env.POSTGRES_PASSWORD ?? "postgres",
                database: env.POSTGRES_DB ?? "postgres",
            });
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "../../db/migrations",
        },
    },
    production: {
        client: "pg",
        connection: () => {
            return connectionSchema.parse({
                host: env.POSTGRES_HOST,
                port: env.POSTGRES_PORT,
                user: env.POSTGRES_USER,
                password: env.POSTGRES_PASSWORD,
                database: env.POSTGRES_DB,
            });
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "../../db/migrations",
        },
    },
};

export default config[NODE_ENV];
