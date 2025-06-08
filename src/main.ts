import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/pages/login/login.component';
import { DashboardViewComponent } from './app/pages/dashboard-view/dashboard-view.component';
import { authGuard } from './app/guards/auth.guard';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SignupComponent } from './app/pages/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardViewComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(NgChartsModule)
  ],
});
