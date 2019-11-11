const path = require("path");
const Sequelize = require("sequelize");

/* 개발자 환경으로 실행 */
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/* 객체 */
db.sequelize = sequelize;
/* function */
db.Sequelize = Sequelize;

db.Article = require("./article")(sequelize, Sequelize);
db.Join = require("./join")(sequelize, Sequelize);
db.Timelog = require("./timelog")(sequelize, Sequelize);
db.Key = require("./key")(sequelize, Sequelize);

module.exports = db;
