
import {throwError as observableThrowError,  Observable } from 'rxjs';


import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { EncryptionService } from 'src/app/service/encryption.service';
//import { RequestOptions } from 'http';
import { environment } from '../../environments/environment';
//import { HttpHeaders } from '@angular/common/http';
//import { RequestOptions } from 'http';

export class Service {
  headers: Headers;
  sessionStorageService: StorageService;


  Options: any;
  ApiUrl: string;

  constructor() {
    const encryptionService = new EncryptionService();
    this.sessionStorageService = new StorageService(encryptionService);
    this.getHeaders();
    this.ApiUrl = environment.apiUrl;
  }

  getHeaders() {
    if (this.sessionStorageService.get('accessToken')) {
      this.headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.sessionStorageService.get('accessToken')
      });
    } else {
      this.headers = new Headers({
        'Content-Type': 'application/json'
      });
    }
  }

  getOption() {
    this.getHeaders();
    //return this.Options = RequestOptions({ headers: this.headers });
  }

  extractData(res: Response | any) {
    const body = res.json();
    return body;
  }

  extractDownload(res: Response | any) {
    const body = res;
    return body;
  }

  handleErrorObservable(error: Response | any) {
    if (error.status === 401) {
      return observableThrowError(error.statusText || error);
    }
    if (typeof error.message  !== 'undefined') {
      console.error(error.message || error);
      return observableThrowError(error.message || error);
    }
  }

  handleErrorPromise(error: Response | any) {
    if (error.status === 401) {
      return observableThrowError(error.statusText || error);
    }
    if (typeof error.message  !== 'undefined') {
      console.error(error.message || error);
      return Promise.reject(error.message || error);
    }
  }
}
