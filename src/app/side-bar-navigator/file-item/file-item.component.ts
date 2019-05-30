import {Component, Input, OnInit} from '@angular/core';
import {DriveFile} from '../../drive/drive-file';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {

  @Input() file: DriveFile;

  constructor() { }

  ngOnInit() {

  }

  onClickFile() {
    console.log(this.file.name)
  }
}
