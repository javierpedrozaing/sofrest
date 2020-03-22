import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public webUrl = 'https://emma-api.rodmensoft.com/';
  constructor(
    private http: HttpClient
  ) { }

  searchCustomerByDNI(dni): Observable<any> {
    return this.http.get<any>(this.webUrl + 'consultByDni/'+dni).pipe();
  }

  searchCustomerByRUC(ruc): Observable<any> {
    return this.http.get<any>(this.webUrl + 'consultByRuc/'+ruc).pipe();
  }
}
