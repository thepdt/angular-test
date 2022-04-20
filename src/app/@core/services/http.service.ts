import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Gif } from '../models/giphy';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getTrendingGifs(offset: number): Observable<APIResponse<Gif[]>> {
    let params = new HttpParams()
      .set('api_key', env.GIPHY_KEY)
      .set('offset', offset);
    return this.http.get<APIResponse<Gif[]>>(`${env.BASE_URL}/trending`, {
      params: params,
    });
  }

  searchGifs(key: string, offset: number): Observable<APIResponse<Gif[]>> {
    let params = new HttpParams()
      .set('api_key', env.GIPHY_KEY)
      .set('q', key)
      .set('offset', offset);
    return this.http.get<APIResponse<Gif[]>>(`${env.BASE_URL}/search`, {
      params: params,
    });
  }

  getGifById(id: string): Observable<APIResponse<Gif>> {
    let params = new HttpParams().set('api_key', env.GIPHY_KEY);
    return this.http.get<APIResponse<Gif>>(`${env.BASE_URL}/${id}`, {
      params: params,
    });
  }

  getGifByIds(ids: string[]): Observable<APIResponse<Gif[]>> {
    let params = new HttpParams()
      .set('api_key', env.GIPHY_KEY)
      .set('ids', ids.join(','));
    return this.http.get<APIResponse<Gif[]>>(`${env.BASE_URL}`, {
      params: params,
    });
  }

  uploadGif(file: File): Observable<HttpEvent<Object>> {
    const formData = new FormData();
    formData.append('api_key', env.GIPHY_KEY);
    formData.append('file', file);
    return this.http.post(`${env.UPLOAD_BASE_URL}`, formData, {reportProgress: true, observe: 'events'});
  }
}
