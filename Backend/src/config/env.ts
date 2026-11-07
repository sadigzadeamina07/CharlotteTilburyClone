import "dotenv/config"
import {z} from "zod"
const envSchema=z.object({
    NODE_ENV:z.enum(["development","test","production"]).default("development"),
    PORT:z.coerce.number().min(1).max(65535).default(4000),
    DATABASE_URL:z.string().min(1),
    JWT_SECRET:z.string().min(16),
    JWT_EXPIRES_IN:z.string().default("7d"),
    CLIENT_URL:z.string().default("http://localhost:5173")
})
export const env=envSchema.parse(process.env)