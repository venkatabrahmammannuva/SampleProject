"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knex = void 0;
const constant_1 = __importDefault(require("./constant"));
var Knex;
(function (Knex) {
    Knex.dbConfig = {
        client: "mysql2",
        connection: {
            host: constant_1.default.app.DB_HOST,
            database: constant_1.default.app.DB_NAME,
            user: constant_1.default.app.DB_USERNAME,
            password: constant_1.default.app.DB_PASSWORD,
            port: constant_1.default.app.DB_PORT,
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
})(Knex = exports.Knex || (exports.Knex = {}));
exports.default = { Knex };
