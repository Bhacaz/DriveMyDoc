import { Component, OnInit } from '@angular/core';
import {DriveService} from '../drive/drive.service';

declare const gapi: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: any;
  auth2: any;

  private clientId: string = '798021972045-vo31kgilujafp0q9gibdmfe7jr5rau25.apps.googleusercontent.com';
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.readonly'
  ].join(' ');

  constructor(
    private driveService: DriveService
  ) { }

  ngOnInit() {
    this.getUserFromlocalStorage();
    if (!this.user) {
      this.googleInit();
    } else {
      this.getFilesRoot();
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        this.user = {};
        this.user.token = googleUser.getAuthResponse().access_token;
        this.user.email = profile.getEmail();
        this.user.name = profile.getName();
        this.user.imageUrl = profile.getImageUrl();
        console.log(this.user);
        this.saveUserInlocalStorage();

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  saveUserInlocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  getUserFromlocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  clearUserlocalStorage() {
    localStorage.removeItem('user');
    this.user = undefined;
    this.googleInit();
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.getAuthInstance();
      this.auth2.signOut().then( () => {
        console.log('User signed out.');
      });
    });
  }

  getFilesRoot() {
    const rootFolderId = '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz';
    this.driveService.getFiles(rootFolderId)
      .subscribe((data) => {
      console.log(data);
    });
  }

}
