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
  cpf: z
    .string()
    .transform((s) => s.replace(/\D/g, ""))
    .refine((digits) => digits.length === 11, {
      message: "CPF deve conter 11 dígitos",
    }),
  email: z.string().min(1, "Email é obrigatório"),
  name: z.string().min(3, "Nome é obrigatório"),
  lastname: z.string().optional(),
  phone: z.string().min(8, "Telefone inválido"),
  password: z.string().min(6, "Senha com menos de 6 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const carSchema = z.object({
    id: z.number().int().positive("ID deve ser um número inteiro positivo").optional(),
    carBrand: z.string().min(1, "Marca do carro é obrigatória"),
    carName: z.string().min(1, "Nome do carro é obrigatório"),
    carCategory: z.string().min(1, "Categoria do carro é obrigatória"),
    fuelType: z.string().min(1, "Tipo de combustível é obrigatório"),
    Year: z.preprocess((v) => {
        if (v === "" || v == null) return undefined;
        const n = Number(v);
        return Number.isNaN(n) ? undefined : n;
    }, z.number().int().min(1900, "Ano deve ser válido").max(new Date().getFullYear(), "Ano não pode ser no futuro")),
    Price: z.preprocess((v) => {
        if (v === "" || v == null) return undefined;
        const n = Number(v);
        return Number.isNaN(n) ? undefined : n;
    }, z.number().positive("Preço deve ser um valor positivo"))
});

