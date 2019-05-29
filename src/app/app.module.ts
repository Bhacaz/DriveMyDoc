import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatToolbarModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {DriveService} from './drive/drive.service';
import {AuthService} from './auth.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideBarNavigatorComponent } from './side-bar-navigator/side-bar-navigator.component';
import { FirstLevelFolderComponent } from './side-bar-navigator/first-level-folder/first-level-folder.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ToolbarComponent,
    SideBarNavigatorComponent,
    FirstLevelFolderComponent,
    FileViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [
    DriveService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
