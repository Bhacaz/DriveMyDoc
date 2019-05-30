import {Component, OnInit} from '@angular/core';
import {DriveService} from '../drive/drive.service';
import {DriveFolder} from '../drive/drive-folder';
import {DriveFile} from '../drive/drive-file';
import {DriveDocument} from '../drive/drive-document';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  documents: any = { files: [], folders: [] };

  constructor(
    private driveService: DriveService
  ) { }

  ngOnInit() {
    this.getFilesRoot();
  }

  getFilesRoot() {
    const rootFolderId = '1ZrcMsg9vniVT2FpvjgZseGUG4SartwLz';
    // this.driveService.getFiles(rootFolderId)
    //   .subscribe((data) => {
    //   console.log(data);
    // });
    const mockFiles = this.mockFiles();

    mockFiles.files.forEach((document) => {
      if (document.name[0] !== '.') {
        if (document.mimeType === 'application/vnd.google-apps.folder') {
          this.documents.folders.push(document as DriveFolder);
        } else {
          this.documents.files.push(document as DriveFile);
        }
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
          'id': '12JM1SiEmDzNRCFM-L',
          'name': 'Hello world from the world',
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
