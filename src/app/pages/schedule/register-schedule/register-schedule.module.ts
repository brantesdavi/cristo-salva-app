import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterScheduleComponent } from './register-schedule.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    HttpClientModule,
    ToastModule,
    CalendarModule,
    InputTextareaModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    RadioButtonModule
  ],
  declarations: [RegisterScheduleComponent],
  exports: [RegisterScheduleComponent],
})
export class RegisterScheduleModule {}
