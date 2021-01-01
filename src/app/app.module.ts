import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { MoodPromptComponent } from './home/mood-prompt/mood-prompt.component';
import { MoodGridComponent } from './home/mood-grid/mood-grid.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { EditMoodDialogComponent } from './modal/edit-mood-modal/edit-mood-dialog/edit-mood-dialog.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoodPromptComponent,
    MoodGridComponent,
    LoginComponent,
    RegisterComponent,
    EditMoodDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  entryComponents: [EditMoodDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
