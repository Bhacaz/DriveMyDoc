import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  auth2: any;

  private clientId: string = '798021972045-vo31kgilujafp0q9gibdmfe7jr5rau25.apps.googleusercontent.com';
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.readonly'
  ].join(' ');

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        scope: this.scope,
        redirect_uri: '/'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.authService.initSession(googleUser);
        this.ngZone.run(() => this.router.navigate(['/']));
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  success() {
    console.log('hello');
  }
}
