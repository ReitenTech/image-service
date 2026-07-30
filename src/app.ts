import express from "express";
import { router } from "@/router";

const app = express();

app.set("trust proxy", true);

app.use("/", router);

export { app };
