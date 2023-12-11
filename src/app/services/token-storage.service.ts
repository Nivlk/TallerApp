import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedInObservable() {
    return this.isLoggedInSubject.asObservable();
  }
  signOut(): void {
    sessionStorage.clear();
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; // Si no hay token, se considera como expirado
    }

    const tokenPayload: any = jwtDecode(token);
    if (!tokenPayload.exp) {
      return true; // Si no hay campo 'exp', se considera como expirado
    }

    const expirationTimestamp = tokenPayload.exp * 1000; // Convertir a milisegundos
    const currentTimestamp = Date.now();

    return currentTimestamp >= expirationTimestamp;
  }

  saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken():any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const userString = sessionStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  getUsername(): string {
    const userString = sessionStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString).username : null;
  }
  extractTokenInfo(){
    try {
      const token = this.getToken();
      const tokenPayload: any = jwtDecode(token);
return tokenPayload.id

  
  //return userId;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }
  extractTokenRole() {
    try {
      const token = this.getToken();
      const tokenPayload: any = jwtDecode(token);
      const roles = tokenPayload.role.map((role: any) => role.authority);
  
      if (roles.includes("admin:update") || roles.includes("admin:create") || roles.includes("admin:delete")) {
        return "admin";
      } else {
        return "user";
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);

    }
  
    return null;
  }
  
  getUserRole(): any {
    const userString = sessionStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString).roles[0] : null;
  }

  permissionForPage(role: string): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    return this.getUserRole() === role;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
