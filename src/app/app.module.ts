import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {DriveService} from './drive/drive.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [DriveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
