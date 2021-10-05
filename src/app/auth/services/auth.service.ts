import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

import { AuthResponse, User } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';


/* import { ok } from 'assert'; */



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  private _user!: User; //Usuario de la apk


  get user(){     //Obtener el usuarios
    return { ...this._user };
  }

  


  constructor(private http: HttpClient) { }

  
  register( name: string, email: string, password: string, role: number){

    const url = `${this.baseUrl}/auth/new`;
    const body = {name, email, password, role};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ok, token}) =>{
          if(ok){
            localStorage.setItem('token', token!);
            
            }
          
        }),

        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
        
      );

  }



  login( email: string, password: string){

    const url = `${ this.baseUrl }/auth`;
    const body = {email, password};
    
    
    return this.http.post<AuthResponse>(url, body)
     .pipe(
       tap(resp => {
        if(resp.ok){
          
          localStorage.setItem('token', resp.token!);
         
        }
      }),
  
       map( resp => resp.ok),
       catchError(err => of(err.error.msg))
     );
    
         
  }





validateToken(): Observable<boolean>{

  const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

  return this.http.get<AuthResponse>(url, {headers })
    .pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
            role: resp.role!  
            
          }

        return resp.ok
      }),
      catchError(err => of(false))
    );
}

logout() {
  localStorage.clear();
}

}
