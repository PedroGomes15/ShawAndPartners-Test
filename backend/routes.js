import express from "express";
import { Router } from "express";
import { files } from "./Controller/files.js";
import { users } from "./Controller/users.js";
import multer from "multer";

const upload = multer({ dest: "tmp/" });

export let routes = Router();

routes.post("/api/files", upload.single("file"), files);
routes.get("/api/users", users);
