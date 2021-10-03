import {Request, Response} from "express";
import DbService from "../services/database.service";
import Track from "../models/track";
import PlaylistTrack from "../models/playlistTrack";

const dbService: DbService = new DbService();

export async function getPlaylists(req: Request, res: Response): Promise<void> {
    console.log('\nGET /api/playlists');

    res.status(200).json(dbService.playlists);
}

export async function getPlaylistTracks(req: Request, res: Response): Promise<void> {
    console.log('\nGET /api/playlisttracks/:id');

    const playlistId: number = parseInt(req.params.id);
    console.log(`playlistId=${playlistId}`);

    const tracks: Track[] = dbService.getPlaylistTracks(playlistId);
    res.status(200).json(tracks);
}

export async function getGenres(req: Request, res: Response): Promise<void> {
    console.log('\nGET /api/genres')

    res.status(200).json(dbService.genres);
}

export async function getTracksForGenre(req: Request, res: Response): Promise<void> {
    console.log('\nGET /api/tracks?genreid=:id');

    const genreId: number = parseInt(req.query.genreid as string);
    console.log(`genreId=${genreId}`);

    res.status(200).json(dbService.getTracksForGenre(genreId));
}

export async function addTrackToPlaylist(req: Request, res: Response): Promise<void> {
    console.log('\nPOST /api/track');

    const playlistId: number = req.body.playlistid as number;
    const trackId: number = req.body.trackid as number;

    const playlistTrack: PlaylistTrack | undefined = createPlaylistTrack(playlistId, trackId, res);
    if (!playlistTrack) return;

    dbService.playlistTracks.push(playlistTrack);
    res.status(200).send();
}

export async function removeTrackFromPlaylist(req: Request, res: Response): Promise<void> {
    console.log('\nDELETE /track?playlistid=playListid&trackid=trackid');

    const playlistId: number = parseInt(req.query.playlistid as string);
    const trackId: number = parseInt(req.query.trackid as string);

    const playlistTrack: PlaylistTrack | undefined = createPlaylistTrack(playlistId, trackId, res);
    if (!playlistTrack) return;

    // if (dbService.playlistTracks.find(track => track.playlistId === playlistTrack.playlistId && track.trackId === playlistTrack.trackId) === undefined) {
    //     res.status(400).send();
    //     return;
    // }

    dbService.removeTrackFromPlaylist(playlistTrack);
    res.status(200).send();
}

function createPlaylistTrack(playlistId: number, trackId: number, res: Response): PlaylistTrack | undefined {
    console.log(`playlistId=${playlistId}`);
    console.log(`trackId=${trackId}`);

    if (playlistId === undefined || trackId === undefined) {
        res.status(400).send();
        return undefined;
    }

    return {
        playlistId: playlistId,
        trackId: trackId
    };
}
