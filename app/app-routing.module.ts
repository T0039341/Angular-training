import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfilesComponent } from './profiles/profiles/profiles.component';
import { AuthGuard } from './guards/auth.guard';
import { AddProfileComponent } from './profiles/add-profile/add-profile.component';




const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',

    component: RegistrationComponent,
  },
  {
    path: 'login',

    component: LoginComponent,
  },
  {
    path: 'profiles',
    canActivate: [AuthGuard],
    component: ProfilesComponent,

  },
  {
    path: 'profiles/add',
    component: AddProfileComponent
  },
  {
    path: 'profiles/:id',
    component: AddProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
