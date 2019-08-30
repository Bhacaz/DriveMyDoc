import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatToolbarModule, MatTreeModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {DriveService} from './drive/drive.service';
import {AuthService} from './auth.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideBarNavigatorComponent } from './side-bar-navigator/side-bar-navigator.component';
import { FirstLevelFolderComponent } from './side-bar-navigator/first-level-folder/first-level-folder.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { FileItemComponent } from './side-bar-navigator/file-item/file-item.component';
import { FolderItemComponent } from './side-bar-navigator/folder-item/folder-item.component';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {AuthorizationInterceptor} from './authorization-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ToolbarComponent,
    SideBarNavigatorComponent,
    FirstLevelFolderComponent,
    FileViewerComponent,
    FileItemComponent,
    FolderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    })
  ],
  providers: [
    DriveService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
