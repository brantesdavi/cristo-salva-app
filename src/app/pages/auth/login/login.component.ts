import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api'; // Importa o MessageService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, MessageService] // Adiciona MessageService ao providers
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService // Injeta o MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      return; // Opcional: Não faz nada se o formulário estiver inválido
    }

    const credentials = {
      email: this.email?.value,
      password: this.password?.value
    };

    this.authService.login(credentials)
      .subscribe({
        next: (res) => {
          if (res.accessToken) {
            this.router.navigate(['/songs']);
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
