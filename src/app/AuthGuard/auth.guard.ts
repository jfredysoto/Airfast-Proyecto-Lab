import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Lógica de autenticación
    return true; // Cambia según tu lógica
  }
}




