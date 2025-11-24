import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(4, "Senha com menos de 4 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  cpf: z.string().min(1, "CPF é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  lastname: z.string().optional(),
  phone: z.string().min(8, "Telefone inválido"),
  password: z.string().min(4, "Senha com menos de 4 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
