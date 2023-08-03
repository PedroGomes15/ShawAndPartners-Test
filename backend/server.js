import express from "express";
import cors from "cors";

const app = express();

import { routes } from "./routes.js";
app.use(cors());
app.use(express.json());

app.use(routes); // Use the defined routes in the application

const PORT = 5000;
app.listen(PORT, () => console.log(`Server backend running on port ${PORT}`));

export default app;
