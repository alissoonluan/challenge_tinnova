module.exports = {
  env: "development",
  nomeApi: "api-vehicle",
  urlApi: "http://localhost",
  portApi: 3333,
  dataConfig: {
    POSTGRES: {
      database: "postgres",
      host: "localhost",
      port: "5432",
      user: "postgres",
      password: "postgres",
    },
  },
};
