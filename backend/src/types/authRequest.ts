import { Request } from "express";

export interface AuthRequest extends Request {
  terapeuta?: {
    id: number;
    email: string;
  };
}