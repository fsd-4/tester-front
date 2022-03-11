import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { Savol } from '../model/savol';

@Injectable({
  providedIn: 'root'
})
export class SavolService {


  
  api = environment.baseApi + "/api/savol";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page>{
    return this.http.get<Page>(this.api, {
      params: params
    });
  }
  getFile(id: number): Observable<Blob>{
      return this.http.get(this.api + "/" + id + "/download",  { responseType: 'blob' });
  }
  getById(id: number): Observable<Savol>{
    return this.http.get<Savol>(this.api + "/" + id);
  }
  create(savol: Savol): Observable<Savol>{
    return this.http.post<Savol>(this.api, savol);
  }
  update(savol: Savol): Observable<Savol>{
    return this.http.put<Savol>(this.api, savol);
  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);
  }

  createVariant(variant: any): any {
    return this.http.post<Savol>(this.api + "/variant", variant);
  }
  updateVariant(variant: any): any {
    return this.http.put<Savol>(this.api + "/variant", variant);
  }

  deleteVariant(id: any) {
    return this.http.delete<any>(this.api + "/variant/" + id);
  }
 
}
