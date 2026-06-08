import { DataTypes, Model, Optional } from "sequelize";
import database from "../config/database";

interface TerapeutaAttributes {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

interface TerapeutaCreationAttributes
  extends Optional<TerapeutaAttributes, "id"> {}

class Terapeuta
  extends Model<TerapeutaAttributes, TerapeutaCreationAttributes>
  implements TerapeutaAttributes
{
  public id!: number;
  public nome!: string;
  public email!: string;
  public cpf!: string;
  public senha!: string;
}

Terapeuta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "terapeutas",
    timestamps: true,
  }
);

export default Terapeuta;