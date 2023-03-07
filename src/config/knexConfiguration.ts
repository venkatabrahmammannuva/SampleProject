import config from "./constant";

export namespace Knex {
	export const dbConfig: any = {
		client: "mysql2",
		connection: {
			host: config.app.DB_HOST,
			database: config.app.DB_NAME,
			user: config.app.DB_USERNAME,
			password: config.app.DB_PASSWORD,
			port: config.app.DB_PORT,
			timezone: "+00:00",
			// typeCast: function(field:any, next:NextFunction) {
			//     if (field.type == 'JSON') {
			//         return (JSON.parse(field.string()));
			//     }
			//     return next();
			// }
		},
		pool: {
			min: 10,
			max: 100,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./migrations/",
			disableMigrationsListValidation: true,
		},
		seeds: {
			directory: "./seed/",
		},
	};
}

export default { Knex };