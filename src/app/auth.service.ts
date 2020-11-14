import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  listUser: User[] = [
    {name: 'Felipe Augusto', email: 'f.augusto@email.com', company: 'Seguradora Nova', password: '123456'},
    {name: 'Fredy Carvalho', email: 'f.carvalho@email.com', company: 'Seguradora Nova', password: '123qwe'}
  ];

  constructor() { }


  login(credentials: {email: string, password: string}): Observable<any> {
    const user = this.listUser.find(element => element.email == credentials.email && element.password == credentials.password);
    if(user !== undefined){
      localStorage.setItem('user', user.email.toString());
      this.subjLoggedIn$.next(true);
      this.subjUser$.next(user);
      return of(user)
    } else {
      return of(null);
    }

  }

  isAuthenticated(): Observable<boolean> {
    const userLogged = localStorage.getItem('user');
    const user = this.listUser.find(element => element.email == userLogged);
    if(user !== undefined){
      this.subjLoggedIn$.next(true);
      this.subjUser$.next(user);
    }
    else {
      this.subjLoggedIn$.next(false);
      this.subjUser$.next(null);
    }
    return this.subjLoggedIn$.asObservable();
  }



  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('user')
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
