import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard/auth-guard.service';

import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { MoodGridComponent } from './home/mood-grid/mood-grid.component';
import { MoodPromptComponent } from './home/mood-prompt/mood-prompt.component';
import { MoodPromptGuardService } from './services/mood-prompt-guard/mood-prompt-guard.service';
import { MoodGridGuardService } from './services/mood-grid-guard/mood-grid-guard.service';

const routes: Routes = [
  { path: 'home', component: MoodPromptComponent, canActivate: [MoodPromptGuardService] },
  { path: 'mood-grid', component: MoodGridComponent, canActivate: [MoodGridGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
