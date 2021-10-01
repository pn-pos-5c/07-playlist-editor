import express from "express";
import { getAllPlaylists, getPlaylistTracks } from "./controllers/rest.controller";

export const router = express.Router();

router.get('/playlists', getAllPlaylists);
router.get('/playlisttracks/:id', getPlaylistTracks);
router.get('/genres');
router.get('/tracks?genreid=:id');
router.post('/track');
router.delete('/track?playlistid=:playListid&trackid=:trackid');
