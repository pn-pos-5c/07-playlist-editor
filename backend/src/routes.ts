import express from "express";
import {
    addTrackToPlaylist,
    getGenres,
    getPlaylists,
    getPlaylistTracks,
    getTracksForGenre,
    removeTrackFromPlaylist
} from "./controllers/rest.controller";

export const router = express.Router();

router.get('/playlists', getPlaylists);
router.get('/playlisttracks/:id', getPlaylistTracks);
router.get('/genres', getGenres);
router.get('/tracks', getTracksForGenre);
router.post('/track', addTrackToPlaylist);
router.delete('/track', removeTrackFromPlaylist);
