import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha com menos de 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  // aceita CPF com ou sem formatação (ex: 123.456.789-09)
  // remove caracteres não numéricos e exige exatamente 11 dígitos
  cpf: z
    .string()
    .transform((s) => s.replace(/\D/g, ""))
    .refine((digits) => digits.length === 11, {
      message: "CPF deve conter 11 dígitos",
    }),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  lastname: z.string().optional(),
  phone: z.string().min(8, "Telefone inválido"),
  password: z.string().min(6, "Senha com menos de 6 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
