import {Component, Input, OnInit} from '@angular/core';
import {DriveDocument} from '../drive/drive-document';
import {DriveFolder} from '../drive/drive-folder';
import {DriveFile} from '../drive/drive-file';

@Component({
  selector: 'app-side-bar-navigator',
  templateUrl: './side-bar-navigator.component.html',
  styleUrls: ['./side-bar-navigator.component.scss']
})
export class SideBarNavigatorComponent implements OnInit {

  @Input() documents: DriveDocument[];
  folders: DriveFolder[] = [];
  files: DriveFile[] = [];

  constructor() { }

  ngOnInit() {
    this.documents.forEach((document) => {
      if (document.constructor.name === 'DriveFolder') {
        this.folders.push(document);
      } else {
        this.files.push(document);
      }
    });
    console.log(this.folders);
    console.log(this.files);
  }
}
