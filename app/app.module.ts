import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './nav/header/header.component';
import { SidebarComponent } from './nav/sidebar/sidebar.component';
import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
import { ProfilesComponent } from './profiles/profiles/profiles.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProfilesComponent,
    HeaderComponent,
    SidebarComponent,
    AddProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireAuthModule


  ],
  providers: [ProfileService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
