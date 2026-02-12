const app = require("./app");
const sequelize = require("./config/db");

const PORT = 5000;

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));

sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB sync error:", err?.message || err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
