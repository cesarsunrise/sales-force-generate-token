import express, { Router } from "express";
import auth from "./auth";

const api: Router = express.Router();

api.use(auth);

export default api;
