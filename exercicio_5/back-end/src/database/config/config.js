const config = require("./env/env");
let db = config.dataConfig.POSTGRES;

module.exports = {
  dialect: "postgres",
  host: db.host,
  username: db.user,
  password: db.password,
  database: db.database,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
};
