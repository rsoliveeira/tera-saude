import { DataTypes, Model, Optional } from "sequelize";
import database from "../config/database";

interface PacienteAttributes {
  id: number;
  nome: string;
  dataNascimento: Date;
  telefone: string;
  observacoes: string;
  terapeutaId: number;
}

interface PacienteCreationAttributes
  extends Optional<PacienteAttributes, "id" | "telefone" | "observacoes"> {}

class Paciente
  extends Model<PacienteAttributes, PacienteCreationAttributes>
  implements PacienteAttributes
{
  public id!: number;
  public nome!: string;
  public dataNascimento!: Date;
  public telefone!: string;
  public observacoes!: string;
  public terapeutaId!: number;
}

Paciente.init(
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
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    terapeutaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "pacientes",
    timestamps: true,
  }
);

export default Paciente;