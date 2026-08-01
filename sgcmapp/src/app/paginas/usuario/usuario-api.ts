import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApi {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/config/usuario`;

  consultar(termoBusca?: string): Observable<Usuario[]> {
    let url = `${this.apiUrl}/consultar`;
    let parametros = new HttpParams();
    if (termoBusca) {
      parametros = parametros.set('termoBusca', termoBusca);
    }
    return this.http.get<Usuario[]>(url, { params: parametros });
  }

  consultarPorId(id: number): Observable<Usuario> {
    let url = `${this.apiUrl}/consultar/${id}`;
    return this.http.get<Usuario>(url);
  }

  salvar(objeto: Usuario): Observable<number | void> {
    let url = `${this.apiUrl}`;
    if (objeto.id) {
      url += '/atualizar';
      return this.http.put<void>(url, objeto);
    } else {
      url += '/inserir';
      return this.http.post<number>(url, objeto);
    }
  }

  remover(id: number): Observable<void> {
    let url = `${this.apiUrl}/remover/${id}`;
    return this.http.delete<void>(url);
  }
}
