import Terapeuta from "./Terapeuta";
import Paciente from "./Paciente";
import Sessao from "./Sessao";

Terapeuta.hasMany(Paciente, {
  foreignKey: "terapeutaId",
  as: "pacientes",
});

Paciente.belongsTo(Terapeuta, {
  foreignKey: "terapeutaId",
  as: "terapeuta",
});

Paciente.hasMany(Sessao, {
  foreignKey: "pacienteId",
  as: "sessoes",
});

Sessao.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  as: "paciente",
});

export { Terapeuta, Paciente, Sessao };