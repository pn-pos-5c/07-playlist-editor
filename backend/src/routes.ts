import express from "express";
import {getAllPlaylists} from "./controllers/rest.controller";

export const router = express.Router();

router.get('/playlists', getAllPlaylists);
