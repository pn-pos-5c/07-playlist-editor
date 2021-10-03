import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private backend: AxiosInstance;

  constructor() {
    this.backend = axios.create({
      baseURL: 'http://localhost:8080/api',
      responseType: 'json'
    });
  }

  async fetchPlaylists(): Promise<AxiosResponse> {
    console.log('GET /api/playlists');
    return this.backend.get('/playlists');
  }

  async fetchTracksForPlaylist(playlistId: number): Promise<AxiosResponse> {
    console.log('GET /api/playlisttracks/:playlistId');
    return this.backend.get(`/playlisttracks/${playlistId}`);
  }
}
