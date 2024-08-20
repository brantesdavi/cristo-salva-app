import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterScheduleComponent } from './pages/schedule/register-schedule/register-schedule.component';
import { CalendarComponent } from './pages/schedule/calendar/calendar.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'schedule/register', component: RegisterScheduleComponent},
    {path:'calendar', component: CalendarComponent}
];
