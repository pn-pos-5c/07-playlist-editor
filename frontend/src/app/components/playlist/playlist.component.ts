import {Component, OnInit} from '@angular/core';
import {DataProviderService} from "../../services/data-provider.service";
import Playlist from "../../models/playlist";
import Track from "../../models/track";
import Genre from "../../models/genre";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlists!: Playlist[];
  tracks!: Track[];
  genres!: Genre[];
  selectedPlaylist: Playlist;
  playlistSelected: boolean;

  numberOfTracks: number = 0;
  totalPlaytime: string = '0ms';

  constructor(public dataProviderService: DataProviderService) {
    this.loadData();
    this.selectedPlaylist = {playlistId: -1, name: 'select one'};
    this.playlistSelected = false;
  }

  ngOnInit(): void {
  }

  formatMs(ms: number): string {
    let seconds: string | number = Math.floor((ms / 1000) % 60),
      minutes: string | number = Math.floor((ms / (1000 * 60)) % 60),
      hours: string | number = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    if (hours === '00') return `${minutes}m ${seconds}s`;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  getGenre(genreId: number): string {
    const genre = this.genres.find(genre => genre.genreId === genreId);
    if (genre) return genre.name;
    return 'unknown';
  }

  async playlistChanged() {
    this.playlistSelected = this.selectedPlaylist.playlistId !== -1;
    if (!this.playlistSelected) return;

    this.tracks = (await this.dataProviderService.fetchTracksForPlaylist(this.selectedPlaylist.playlistId)).data;
    console.log(this.tracks);

    this.numberOfTracks = this.tracks.length;
    this.totalPlaytime = this.formatMs(this.tracks.reduce((prev: number, curr: Track) => prev + curr.milliseconds, 0));
  }

  private async loadData() {
    this.playlists = (await this.dataProviderService.fetchPlaylists()).data;
    this.genres = (await this.dataProviderService.fetchGenres()).data;

    this.playlists.unshift(this.selectedPlaylist);
    this.selectedPlaylist = this.playlists[0];
  }

  async removeFromPlaylist(track: Track) {
    await this.dataProviderService.removeTrackFromPlaylist(this.selectedPlaylist.playlistId, track.trackId);
    this.tracks = (await this.dataProviderService.fetchTracksForPlaylist(this.selectedPlaylist.playlistId)).data;
    console.log(this.tracks);
    // this.tracks = this.tracks.filter(track => JSON.stringify(track) !== JSON.stringify(track));
  }
}
