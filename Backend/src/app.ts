import express from "express";
import { errorHandler, notFound } from "./middleware/error-handler.js";

export const app = express()
app.use(express.json())
app.get("/health", async (_req, res) => {
    try {
        res.json({ status: "ok", db: "ok" })
    }
    catch {
        res.status(503).json({ status: "error", db: "down" })
    }
})
app.use(notFound)
app.use(errorHandler)