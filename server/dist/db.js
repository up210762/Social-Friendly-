"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("mysql2");
const keys_1 = require("./keys");
const DB_ERRORS = {
    PROTOCOL_CONNECTION_LOST: 'DB connection is Lost!',
    ER_CON_COUNT_ERROR: 'A lot of DB Connections!',
    ECONNREFUSED: 'DB Connection is not available!',
};
const DEFAULT_ERROR = error => console.error(error);
const poolConnection = (0, mysql2_1.createPool)({
    host: keys_1.DB_HOST,
    port: keys_1.DB_PORT,
    database: keys_1.DB_NAME,
    user: keys_1.DB_USER,
    password: keys_1.DB_PASS,
});
poolConnection.getConnection((error, connection) => {
    if (error) {
        DB_ERRORS[error.code]
            ? console.error(DB_ERRORS[error.code])
            : DEFAULT_ERROR(error);
        return;
    }
    if (connection)
        console.log('>> DB is connected!');
});
exports.default = poolConnection.promise();
//# sourceMappingURL=db.js.map