import {Component, OnInit} from '@angular/core';
import {DriveService} from '../drive/drive.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private driveService: DriveService
  ) { }

  ngOnInit() {

  }

  saveUserInlocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  getUserFromlocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // clearUserlocalStorage() {
  //   localStorage.removeItem('user');
  //   this.user = undefined;
  //   this.googleInit();
  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.getAuthInstance();
  //     this.auth2.signOut().then( () => {
  //       console.log('User signed out.');
  //     });
  //   });
  // }

  getFilesRoot() {
    const rootFolderId = '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz';
    this.driveService.getFiles(rootFolderId)
      .subscribe((data) => {
      console.log(data);
    });
  }
}
