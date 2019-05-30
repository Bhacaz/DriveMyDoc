import {Component, Input, OnInit} from '@angular/core';
import {DriveFolder} from '../../drive/drive-folder';
import {DriveService} from '../../drive/drive.service';

@Component({
  selector: 'app-first-level-folder',
  templateUrl: './first-level-folder.component.html',
  styleUrls: ['./first-level-folder.component.scss']
})
export class FirstLevelFolderComponent implements OnInit {

  @Input() folder: DriveFolder;

  constructor(private driveService: DriveService) { }

  ngOnInit() {
    this.fetchFiles();
  }

  fetchFiles() {
    // this.driveService.getFiles(this.folder.id)
    //   .subscribe((data) => {
    //   console.log(data);
    // });
  }

}
