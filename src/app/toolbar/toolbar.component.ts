import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authService.logout();
  }
}
