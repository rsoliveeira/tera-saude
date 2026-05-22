import { DataTypes, Model, Optional } from "sequelize";
import database from "../config/database";

interface SessaoAttributes {
  id: number;
  dataSessao: Date;
  descricaoAtendimento: string;
  observacoesClinicas: string;
  pacienteId: number;
}

interface SessaoCreationAttributes
  extends Optional<SessaoAttributes, "id" | "observacoesClinicas"> {}

class Sessao
  extends Model<SessaoAttributes, SessaoCreationAttributes>
  implements SessaoAttributes
{
  public id!: number;
  public dataSessao!: Date;
  public descricaoAtendimento!: string;
  public observacoesClinicas!: string;
  public pacienteId!: number;
}

Sessao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataSessao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descricaoAtendimento: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observacoesClinicas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "sessoes",
    timestamps: true,
  }
);

export default Sessao;