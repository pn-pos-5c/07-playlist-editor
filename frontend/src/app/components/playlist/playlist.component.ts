import { Component, OnInit } from '@angular/core';
import { DataProviderService } from "../../services/data-provider.service";
import Playlist from "../../models/playlist";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlists!: Playlist[];
  selectedPlaylist!: Playlist;
  numberOfTracks: number = 0;
  totalPlaytime: number = 0;
  showAddTrackButton: boolean = false;

  constructor(public dataProviderService: DataProviderService) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private async loadData() {
    this.playlists = (await this.dataProviderService.fetchPlaylists()).data;
    this.selectedPlaylist = this.playlists[0];
  }

}
