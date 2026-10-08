import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = 'http://localhost:8080/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerReportes(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  crearReporte(reporte: any): Observable<any> {
    return this.http.post(this.apiUrl, reporte);
  }
}