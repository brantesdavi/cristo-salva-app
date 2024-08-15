import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api'; // Importa o MessageService

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  providers: [AuthService, MessageService]
})
export class RegisterScheduleComponent {
  register: FormGroup;
  datetimeValue: Date | undefined; // Valor associado ao p-calendar

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService // Injeta o MessageService
  ) {
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]],
      password: ['', Validators.required],
      datetime: [null, Validators.required] // Mantém o controle de data e hora no formulário
    });
  }

  get email() {
    return this.register.get('email');
  }

  get password() {
    return this.register.get('password');
  }

  get title() {
    return this.register.get('title');
  }

  get datetime() {
    return this.register.get('datetime');
  }

  loginUser(): void {
    if (this.register.invalid) {
      return; // Opcional: Não faz nada se o formulário estiver inválido
    }

    const credentials = {
      email: this.email?.value,
      password: this.password?.value,
      datetime: this.datetime?.value // Inclui a data e hora nas credenciais
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
          this.messageService.add({severity: 'error', summary: 'Login Error', detail: 'Credenciais inválidas ou outro erro. Por favor, tente novamente.'});
        }
      });
  }
}
