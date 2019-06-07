import {Component, NgZone, OnInit} from '@angular/core';
import {DriveService} from '../drive/drive.service';
import {DriveFolder} from '../drive/drive-folder';
import {DriveFile} from '../drive/drive-file';
import {DriveDocument} from '../drive/drive-document';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  documents: any = { files: [], folders: [] };

  constructor(
    private driveService: DriveService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkIfAuthentified();
    this.getFilesRoot();
  }

  getFilesRoot() {
    this.driveService.getFiles(environment.rootFolderId)
      .subscribe((data) => {
      data.files.forEach((document) => {
        if (document.name[0] !== '.') {
          if (document.mimeType === 'application/vnd.google-apps.folder') {
            this.documents.folders.push(document as DriveFolder);
          } else {
            this.documents.files.push(document as DriveFile);
          }
        }
      });
    });
  }

  checkIfAuthentified() {
    if (!this.driveService.getUserFromlocalStorage()) {
      this.ngZone.run(() => this.router.navigate(['/login']));
    }
  }
}
