import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api'; // Importa o MessageService
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, MessageService, LocalstorageService] // Adiciona MessageService ao providers
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private localStorage: LocalstorageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      return; // Opcional: Não faz nada se o formulário estiver inválido
    }

    const credentials = {
      username: this.username?.value,
      password: this.password?.value
    };

    this.authService.login(credentials)
      .subscribe({
        next: (res) => {
          if (res.accessToken) {
            this.localStorage.setToken(res.accessToken)   
            this.localStorage.setUserId(res.userID)     
            this.router.navigate(['/calendar']);
          }
        },
        error: (error) => {
          console.log('Login error:', error);
          this.messageService.add({severity: 'error', summary: 'Login Error', detail: 'Credenciais invalidas ou outro erro. Por favor tente novamente.'});
          // Exibe a mensagem de erro usando o Toast
        }
      });
  }
}
