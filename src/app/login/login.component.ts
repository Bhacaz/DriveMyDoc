import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: any;
  auth2: any;

  private clientId: string = '798021972045-vo31kgilujafp0q9gibdmfe7jr5rau25.apps.googleusercontent.com';
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.readonly'
  ].join(' ');

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.googleInit();
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
        this.ngZone.run(() => this.router.navigate(['/']));

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
