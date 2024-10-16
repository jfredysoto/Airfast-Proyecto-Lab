import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showLoginMenu = false; // Controla la visibilidad del menú de login
  email: string = '';     // Guarda el email ingresado por el usuario
  password: string = '';  // Guarda la contraseña ingresada
  isLoggedIn: boolean = false; // Controla si el usuario está autenticado

  constructor(private authService: AuthService,private router: Router) {
    // Verificar si el usuario ya está logeado al cargar el componente
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail){
      this.email = storedEmail;
      this.isLoggedIn = true;
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.exito){
          this.isLoggedIn = true;
          localStorage.setItem('userEmail', this.email);
          if(response.userType){
            this.authService.setUserType(response.userType);
          }
          console.log(response.userType);
          alert('Inicio de sesión exitoso');
          this.toggleLoginMenu();
          this.router.navigate(['/header']); // Redirige al usuario después de iniciar sesión
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud', error);
        alert('Ocurrió un error al iniciar sesión');
      }
    );

    /*if (this.email === 'usuario@example.com' && this.password === '123456') {
      this.isLoggedIn = true; // El usuario está logueado
      this.router.navigate(['/header']);
      alert('Credenciales correctas');
      this.toggleLoginMenu();
    } else {
      alert('Credenciales incorrectas. Por favor, intente de nuevo.');
    }*/

  }

  toggleLoginMenu() {
    this.showLoginMenu = !this.showLoginMenu;
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
      userMenu.classList.toggle('active', this.showLoginMenu);
    }
  }

  // Método para cerrar la sesión (opcional)
  logout() {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    // Elimina la sesion guardada
    localStorage.removeItem('userEmail');
    //redirige a inicio
    this.router.navigate(['/home']);
  }

  editarPerfil(){
    console.log('Editar perfil');
  }
}

