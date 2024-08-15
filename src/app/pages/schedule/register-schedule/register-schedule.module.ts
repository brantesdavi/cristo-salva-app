import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterScheduleComponent } from './register-schedule.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    HttpClientModule,
    ToastModule,
    CalendarModule
  ],
  declarations: [RegisterScheduleComponent],
  exports: [RegisterScheduleComponent],
})
export class RegisterScheduleModule {}
