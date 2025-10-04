import {z} from 'zod'

export const clientSchema = z.object({
  id: z.number().int().positive().optional(),
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