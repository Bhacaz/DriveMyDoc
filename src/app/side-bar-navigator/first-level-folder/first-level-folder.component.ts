import {Component, Input, OnInit} from '@angular/core';
import {DriveFolder} from '../../drive/drive-folder';
import {DriveService} from '../../drive/drive.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DriveDocument} from '../../drive/drive-document';
import {BehaviorSubject} from 'rxjs';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  source: any;
}

@Component({
  selector: 'app-first-level-folder',
  templateUrl: './first-level-folder.component.html',
  styleUrls: ['./first-level-folder.component.scss']
})
export class FirstLevelFolderComponent implements OnInit {

  @Input() folder: DriveFolder;
  documents: DriveDocument[] = [];

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.files);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataChange = new BehaviorSubject<DriveDocument[]>([]);


  constructor(private driveService: DriveService) { }

  ngOnInit() {
    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
    this.fetchFiles(this.folder.id, this.documents);
  }

  fetchFiles(documentId: string, documents: DriveDocument[]) {
    this.driveService.getFiles(documentId)
      .subscribe((data) => {
        data.files.forEach((document) => {
          if (document.name[0] !== '.') {
            if (document.mimeType === 'application/vnd.google-apps.folder') {
              document.files = [];
              this.fetchFiles(document.id, document.files);
            }
            documents.push(document);
            this.dataChange.next(this.documents);
          }
        });
    });
  }

  _transformer(node: DriveDocument, level: number) {
    return {
      expandable: !!node.files && node.files.length > 0,
      name: node.name,
      level: level,
      source: node
    };
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}

// To create a search filter
// https://stackblitz.com/edit/angular-yb37gh?file=app%2Ftree-checklist-example.html
