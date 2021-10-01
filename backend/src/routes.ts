import express from "express";
import { getGenres, getPlaylists, getPlaylistTracks } from "./controllers/rest.controller";

export const router = express.Router();

router.get('/playlists', getPlaylists);
router.get('/playlisttracks/:id', getPlaylistTracks);
router.get('/genres', getGenres);
router.get('/tracks?genreid=:id');
router.post('/track');
router.delete('/track?playlistid=:playListid&trackid=:trackid');
