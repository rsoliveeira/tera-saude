export const limparMascara = (valor: string): string => {
  return valor.replace(/\D/g, "");
};

export const formatarCpf = (cpf: string): string => {
  const numeros = limparMascara(cpf);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14);
};

export const formatarTelefone = (telefone: string): string => {
  const numeros = limparMascara(telefone);

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

export const formatarData = (data: string): string => {
  const numeros = limparMascara(data);

  return numeros
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
    .slice(0, 10);
};

export const validarDataBrasileira = (data: string): boolean => {
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const resultado = regexData.exec(data);

  if (!resultado) {
    return false;
  }

  const dia = Number(resultado[1]);
  const mes = Number(resultado[2]);
  const ano = Number(resultado[3]);

  if (mes < 1 || mes > 12) {
    return false;
  }

  if (ano < 1900 || ano > new Date().getFullYear()) {
    return false;
  }

  const ultimoDiaDoMes = new Date(ano, mes, 0).getDate();

  return dia >= 1 && dia <= ultimoDiaDoMes;
};

export const validarTelefoneBrasileiro = (telefone: string): boolean => {
  const numeros = limparMascara(telefone);

  if (numeros.length !== 11) {
    return false;
  }

  return numeros[2] === "9";
};

export const converterDataParaApi = (data: string): string => {
  if (!data) return "";

  const partes = data.split("/");

  if (partes.length !== 3) {
    return data;
  }

  const [dia, mes, ano] = partes;

  return `${ano}-${mes}-${dia}`;
};

export const converterDataParaTela = (data: string): string => {
  if (!data) return "";

  const partes = data.split("-");

  if (partes.length !== 3) {
    return data;
  }

  const [ano, mes, dia] = partes;

  return `${dia}/${mes}/${ano}`;
};