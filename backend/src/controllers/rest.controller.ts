import { Request, Response } from "express";
import DbService from "../services/database.service";
import Track from "../models/track";

const dbService: DbService = new DbService();

export async function getPlaylists(req: Request, res: Response) {
    console.log('GET /api/playlists');

    res.status(200).json(dbService.playlists);
}

export async function getPlaylistTracks(req: Request, res: Response) {
    console.log('GET /api/playlisttracks/:id');

    const playlistId = parseInt(req.params.id);
    console.log(`playlistId=${playlistId}`);

    const tracks: Track[] = dbService.getPlaylistTracks(playlistId);
    res.status(200).json(tracks);
}

export async function getGenres(req: Request, res: Response) {
    console.log('GET /api/genres')

    res.status(200).json(dbService.genres);
}
