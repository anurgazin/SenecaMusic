import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    let params = new HttpParams()
      .set('include_groups', ['album', 'single'].join(','))
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          { headers: { Authorization: `Bearer ${token}` }, params: params }
        );
      })
    );
  }
  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }
  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }
  addToFavourites(id): Observable<[String]> {
    return this.http.put<[String]>(
      `${environment.userAPIBase}/favourites/${id}`,
      id
    );
  }
  removeFromFavourites(id): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          let param = new HttpParams().set('ids', favouritesArray.join(','));
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>('https://api.spotify.com/v1/tracks', {
                  headers: { Authorization: `Bearer ${token}` },
                  params: param,
                });
              })
            );
          }
          return new Observable((o) => o.next({ tracks: [] }));
        })
      );
  }
  getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites`)
      .pipe(
        mergeMap((favouritesArray) => {
          let param = new HttpParams().set('ids', favouritesArray.join(','));
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>('https://api.spotify.com/v1/tracks', {
                  headers: { Authorization: `Bearer ${token}` },
                  params: param,
                });
              })
            );
          }
          return new Observable((o) => o.next({ tracks: [] }));
        })
      );
  }
  searchArtists(
    searchString: string
  ): Observable<SpotifyApi.ArtistSearchResponse> {
    let param = new HttpParams()
      .set('q', searchString)
      .set('type', 'artist')
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/search`, {
          headers: { Authorization: `Bearer ${token}` },
          params: param,
        });
      })
    );
  }
}
