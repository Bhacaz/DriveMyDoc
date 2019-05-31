import {Component, Input, OnInit} from '@angular/core';
import {DriveFolder} from '../../drive/drive-folder';
import {DriveService} from '../../drive/drive.service';
import {DriveFile} from '../../drive/drive-file';
import {DriveDocument} from '../../drive/drive-document';

@Component({
  selector: 'app-first-level-folder',
  templateUrl: './first-level-folder.component.html',
  styleUrls: ['./first-level-folder.component.scss']
})
export class FirstLevelFolderComponent implements OnInit {

  @Input() folder: DriveFolder;
  documents: any = [];

  constructor(private driveService: DriveService) { }

  ngOnInit() {
    console.log(this.folder);
    this.documents = this.fetchFiles(this.folder.id);
    console.log(this.documents);
  }

  fetchFiles(documentId: string) {
    const fetchedDocuments = [];
    this.driveService.getFiles(documentId)
      .subscribe((data) => {
        data.files.forEach((document) => {
          if (document.name[0] !== '.') {
            if (document.mimeType === 'application/vnd.google-apps.folder') {
              document.files = this.fetchFiles(document.id);
            }
            fetchedDocuments.push(document);
          }
        });
    });
    return fetchedDocuments;
  }
}

