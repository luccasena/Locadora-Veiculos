"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validateClient = zod_1.z.object({
    name: zod_1.z.string().min(3, "Minimo 3 caracteres"),
    lastname: zod_1.z.string(),
    email: zod_1.z.string().min(3, "Minimo 3 caracteres")
});
const validateContract = zod_1.z.object({
    name: zod_1.z.string().min(3, "Minimo 3 caracteres"),
    lastname: zod_1.z.string(),
    email: zod_1.z.string().min(3, "Minimo 3 caracteres")
});
