export const campoEstaVazio = (valor?: string): boolean => {
  return !valor || valor.trim().length === 0;
};

export const validarCamposObrigatorios = (
  campos: Record<string, string | undefined>
): void => {
  const camposVazios = Object.entries(campos)
    .filter(([, valor]) => campoEstaVazio(valor))
    .map(([campo]) => campo);

  if (camposVazios.length > 0) {
    throw new Error(`Campos obrigatórios: ${camposVazios.join(", ")}`);
  }
};

export const validarEmail = (email: string): void => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email.trim())) {
    throw new Error("E-mail inválido");
  }
};

export const limparCpf = (cpf: string): string => {
  return cpf.replace(/\D/g, "");
};

export const validarCpf = (cpf: string): void => {
  const cpfLimpo = limparCpf(cpf);

  if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
    throw new Error("CPF inválido");
  }

  const calcularDigito = (base: string, fatorInicial: number): number => {
    const soma = base
      .split("")
      .reduce((total, numero, index) => {
        return total + Number(numero) * (fatorInicial - index);
      }, 0);

    const resto = (soma * 10) % 11;

    return resto === 10 ? 0 : resto;
  };

  const primeiroDigito = calcularDigito(cpfLimpo.slice(0, 9), 10);
  const segundoDigito = calcularDigito(cpfLimpo.slice(0, 10), 11);

  if (
    primeiroDigito !== Number(cpfLimpo[9]) ||
    segundoDigito !== Number(cpfLimpo[10])
  ) {
    throw new Error("CPF inválido");
  }
};