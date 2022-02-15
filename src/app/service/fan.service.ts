import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fan } from '../model/fan';

@Injectable({
  providedIn: 'root'
})
export class FanService {

  api = environment.baseApi + "/api/fan";

  constructor(private http: HttpClient) { }

  getAll(key: string): Observable<Fan[]>{
    return this.http.get<Fan[]>(this.api, {
      params: {
        key: key
      }
    });
  }
  getById(id: number): Observable<Fan>{
    return this.http.get<Fan>(this.api + "/" + id);
  }
  create(fan: Fan): Observable<Fan>{
    return this.http.post<Fan>(this.api, fan);
  }
  update(fan: Fan): Observable<Fan>{
    return this.http.put<Fan>(this.api, fan);
  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);
  }
}
