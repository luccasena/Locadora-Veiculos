import {z} from 'zod'

export const clientSchema = z.object({
  id: z.number().int().positive().optional(),
  cpf: z.string().min(11,"Minimo 11 caracteres").max(14,"Maximo 14 caracteres"),
  password: z.string().min(6,"Minimo 6 caracteres"),
  phone: z.string().min(10,"Minimo 10 caracteres").max(15,"Maximo 15 caracteres"),
  name: z.string().min(3,"Minimo 3 caracteres"),
	lastname: z.string(),
  email: z.string().email(),
})

export const carSchema = z.object({
  id: z.number().int().positive().optional(),
  carBrand: z.string(),
  carName: z.string(),
  carCategory: z.string(),
  fuelType: z.string(),
  Year: z.number(),
  Price: z.number(),
});

export const contractSchema = z.object({
  id: z.number().int().positive().optional(),
  StartDate: z.string().datetime(),
  EndDate: z.string().datetime(),
  idCar: z.number().int().positive(),
  idClient: z.number().int().positive(),
});