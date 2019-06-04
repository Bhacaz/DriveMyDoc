import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  fileId: string;
  safeUrl: any;

  constructor(private route: ActivatedRoute,
              public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fileId = params.fileId;
      const url = 'https://docs.google.com/viewer?srcid=' + this.fileId + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true'
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);      // In a real app: dispatch action to load the details here.
    });
  }
}
