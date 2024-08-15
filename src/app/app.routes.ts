import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterScheduleComponent } from './pages/schedule/register-schedule/register-schedule.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'', component: RegisterScheduleComponent},
];
