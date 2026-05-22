import app from "./app";
import sequelize from "./config/database";
import "./models";

const port = process.env.PORT || 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");

    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso");

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao iniciar servidor:", error);
  });