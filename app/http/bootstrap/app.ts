import "reflect-metadata";
import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(
    logger(":method :url :status :res[content-length] - :response-time ms")
);

export default app;
