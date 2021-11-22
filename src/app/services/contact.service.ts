import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ListaUsuario } from '../interfaces/contact';
import { Refrencia } from '../interfaces/create-user';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ListaUsuario>{
    return this.http.get<ListaUsuario>('http://localhost:8080/api/usuarios');
  }

  create(usuario: Contact){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const options = {
      headers: headers
    };
    return this.http.post<ListaUsuario>('http://localhost:8080/api/usuarios', usuario, options);
  }

  update(usuario: Contact){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const options = {
      headers: headers
    };

    return this.http.put<Refrencia>(`http://localhost:8080/api/usuarios/${usuario.uid}`, usuario, options);
  }

  delete(usuario: Contact){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const options = {
      headers: headers
    };

    return this.http.delete<Refrencia>(`http://localhost:8080/api/usuarios/${usuario.uid}`);
  }

  
}
