import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';

declare const gapi: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  user: any;
  auth2: any;
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.readonly'
  ].join(' ');

  constructor(private authService: AuthService,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.auth2.signOut().then( () => {
      this.authService.logout();
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.clientId,
        scope: this.scope
      });
      window['logout'] = () => this.ngZone.run(() => this.logout());
    });
  }
}
