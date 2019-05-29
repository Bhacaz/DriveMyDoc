import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;

  private clientId: string = '798021972045-vo31kgilujafp0q9gibdmfe7jr5rau25.apps.googleusercontent.com';
  private scope = [
    'profile',
    'email',
    'drive'
  ].join(' ');

  constructor() { }

  ngOnInit() {
    // this.googleInit();
  }



}
