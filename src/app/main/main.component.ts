import {Component, OnInit} from '@angular/core';
import {DriveService} from '../drive/drive.service';
import {DriveFolder} from '../drive/drive-folder';
import {DriveFile} from '../drive/drive-file';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any;

  constructor(
    private driveService: DriveService
  ) { }

  ngOnInit() {
    this.getFilesRoot();
  }

  // getUserFromlocalStorage() {
  //   this.user = JSON.parse(localStorage.getItem('user'));
  // }
  //
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
    // this.driveService.getFiles(rootFolderId)
    //   .subscribe((data) => {
    //   console.log(data);
    // });
    const mockFiles = this.mockFiles();
    const folders: DriveFolder[] = [];
    const files: DriveFile[] = [];
    mockFiles.files.forEach((document) => {
      if (document.mimeType === 'application/vnd.google-apps.folder') {
        folders.push(new DriveFolder(
          document.id, document.name, document.mimeType, document.parents, document.webViewLink, document.iconLink
        ));
      } else {
        files.push(new DriveFile(
          document.id, document.name, document.mimeType, document.parents, document.webViewLink, document.iconLink
        ));
      }
    });
  }

  mockFiles() {
    return {
      'files': [
        {
          'id': '12JM1SiEmDzNRCFM-L-zo82gkVzk-SQ4vxy3RcWMao4s',
          'name': 'DriveMyDoc Roadmap',
          'mimeType': 'application/vnd.google-apps.spreadsheet',
          'parents': [
            '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz'
          ],
          'webViewLink': 'https://docs.google.com/spreadsheets/d/12JM1SiEmDzNRCFM-L-zo82gkVzk-SQ4vxy3RcWMao4s/edit?usp=drivesdk',
          'iconLink': 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet'
        },
        {
          'id': '1daxNavvzRYbbaEAfqiTT1NW-kdl0Nv6A',
          'name': 'Document Google Docs',
          'mimeType': 'application/vnd.google-apps.folder',
          'parents': [
            '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz'
          ],
          'webViewLink': 'https://drive.google.com/drive/folders/1daxNavvzRYbbaEAfqiTT1NW-kdl0Nv6A',
          'iconLink': 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared'
        },
        {
          'id': '1EEsdu7yLzS9R2Huzm1LdIX2X06srPUkM',
          'name': 'Tips and tricks',
          'mimeType': 'application/vnd.google-apps.folder',
          'parents': [
            '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz'
          ],
          'webViewLink': 'https://drive.google.com/drive/folders/1EEsdu7yLzS9R2Huzm1LdIX2X06srPUkM',
          'iconLink': 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared'
        },
        {
          'id': '1NIXmbM3b4c9TnmcBBotjddIjU4hulHbv',
          'name': '.attachments',
          'mimeType': 'application/vnd.google-apps.folder',
          'parents': [
            '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz'
          ],
          'webViewLink': 'https://drive.google.com/drive/folders/1NIXmbM3b4c9TnmcBBotjddIjU4hulHbv',
          'iconLink': 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared'
        }
      ]
    };
  }
}
