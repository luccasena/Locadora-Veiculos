import { loginSchema } from "./loginSchema";
import { z } from "zod";

export const validateLogin = (data: unknown) => {
  try {
    const validatedData = loginSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};
