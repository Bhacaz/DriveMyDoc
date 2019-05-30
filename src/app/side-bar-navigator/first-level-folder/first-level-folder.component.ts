import {Component, Input, OnInit} from '@angular/core';
import {DriveFolder} from '../../drive/drive-folder';

@Component({
  selector: 'app-first-level-folder',
  templateUrl: './first-level-folder.component.html',
  styleUrls: ['./first-level-folder.component.scss']
})
export class FirstLevelFolderComponent implements OnInit {

  @Input() folder: DriveFolder;

  constructor() { }

  ngOnInit() {
  }

}
