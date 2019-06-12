import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';

@Injectable()

export class DriveService {

  DRIVE_API_URL = 'https://content.googleapis.com/drive/v3/';
  FIELDS = 'files(id, name, parents, webViewLink, iconLink, mimeType)';

  headers: HttpHeaders;
  accessToken: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.accessToken = this.authService.getUserToken();
    this.headers = new HttpHeaders({ Authorization: 'Bearer ' + this.accessToken });
  }

  getFiles(parentId: string): any {
    const params = {
      q: '\'' + parentId + '\'' + ' in parents and trashed = false',
      orderBy: 'folder',
      fields: this.FIELDS,
      pageSize: '1000',
      includeTeamDriveItems: 'true',
      includeItemsFromAllDrives: 'true',
      supportsAllDrives: 'true',
      supportsTeamDrives: 'true'
    };

    return this.http.get(this.DRIVE_API_URL + 'files', { headers: this.headers, params });
  }

  getFile(fileId: string): any {
    const params = {
      fields: '*',
      includeTeamDriveItems: 'true',
      includeItemsFromAllDrives: 'true',
      supportsAllDrives: 'true',
      supportsTeamDrives: 'true'
    };

    return this.http.get(this.DRIVE_API_URL + 'files/' + fileId, { headers: this.headers, params });
  }

  fileContentUrl(fileId: string) {
    return this.DRIVE_API_URL + 'files/' + fileId + '?alt=media';
  }

  getFileContent(fileId: string) {
    return this.http.get(this.fileContentUrl(fileId), { headers: this.headers, responseType: 'text' });
  }
}
