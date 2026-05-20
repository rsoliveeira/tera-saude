import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "terasaude_secret";

export const gerarToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verificarToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};