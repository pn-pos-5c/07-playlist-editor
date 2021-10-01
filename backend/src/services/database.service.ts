import Playlist from "../models/playlist";
import CsvParser from "../middleware/csvParser";
import PlaylistTrack from "../models/playlistTrack";
import Genre from "../models/genre";
import Track from "../models/track";

export default class DbService {
    csvParser: CsvParser = new CsvParser();

    playlists: Playlist[] = [];
    playlistTracks: PlaylistTrack[] = [];
    genres: Genre[] = [];
    tracks: Track[] = [];

    constructor() {
        this.playlists = this.csvParser.parse('./assets/playlist.csv');
        this.playlistTracks = this.csvParser.parse('./assets/playlist-track.csv');
        this.genres = this.csvParser.parse('./assets/genre.csv');
        this.tracks = this.csvParser.parse('./assets/track.csv');
    }

    getPlaylistTracks(playlistId: number): Track[] {
        const playlistTracks = this.playlistTracks.filter(track => track.playlistId == playlistId);

        const tracks: Track[] = [];
        for (const playlistTrack of playlistTracks) {
            tracks.push(this.tracks[playlistTrack.trackId]);
        }

        return tracks;
    }
}
