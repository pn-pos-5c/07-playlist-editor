import { Component, OnInit } from '@angular/core';
import { DataProviderService } from "../../services/data-provider.service";
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

  private async loadData() {
    this.playlists = (await this.dataProviderService.fetchPlaylists()).data;

    this.playlists.unshift(this.selectedPlaylist);
    this.selectedPlaylist = this.playlists[0];
  }

  async playlistChanged() {
    this.playlistSelected = this.selectedPlaylist.playlistId !== -1;
    if (!this.playlistSelected) return;

    this.tracks = (await this.dataProviderService.fetchTracksForPlaylist(this.selectedPlaylist.playlistId)).data;

    this.numberOfTracks = this.tracks.length;
    this.totalPlaytime = PlaylistComponent.formatMs(this.tracks.reduce((prev: number, curr: Track) => prev + curr.milliseconds, 0));
  }

  private static formatMs(ms: number): string { // TODO: repair backend parsing (splitting at '",' instead of ',')
    console.log('ms: ', ms);

    let seconds: string | number = Math.floor((ms / 1000) % 60),
      minutes: string | number = Math.floor((ms / (1000 * 60)) % 60),
      hours: string | number = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
