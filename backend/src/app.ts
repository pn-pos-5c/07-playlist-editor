import express from "express";
import cors from "cors";
import {router} from "./routes";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
