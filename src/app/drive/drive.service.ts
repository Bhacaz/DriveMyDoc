import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()

export class DriveService {

  DRIVE_API_URL = 'https://content.googleapis.com/drive/v3/';
  FIELDS = 'files(id, name, parents, webViewLink, iconLink, mimeType)';

  headers: HttpHeaders;
  accessToken: string;

  constructor(private http: HttpClient) {
    this.accessToken = this.getUserFromlocalStorage();
    this.headers = new HttpHeaders({ Authorization: 'Bearer ' + this.accessToken });
  }

  getFiles(parentId: string): any {
    const params = {
      q: '\'' + parentId + '\'' + ' in parents and trashed = false',
      order_by: 'folder',
      fields: this.FIELDS,
      page_size: '1000',
      supports_team_drives: 'true',
      include_team_drive_items: 'true'
    };

    return this.http.get(this.DRIVE_API_URL + 'files', { headers: this.headers, params });
  }

  getFile(fileId: string): any {
    const params = {
      fields: '*',
      supports_team_drives: 'true',
      include_team_drive_items: 'true'
    };

    return this.http.get(this.DRIVE_API_URL + 'files/' + fileId, { headers: this.headers, params });
  }

  fileContentUrl(fileId: string) {
    return this.DRIVE_API_URL + 'files/' + fileId + '?alt=media';
  }

  getFileContent(fileId: string) {
    return this.http.get(this.fileContentUrl(fileId), { headers: this.headers, responseType: 'text' });
  }

  getUserFromlocalStorage() {
    return localStorage.getItem('token');
  }
}
