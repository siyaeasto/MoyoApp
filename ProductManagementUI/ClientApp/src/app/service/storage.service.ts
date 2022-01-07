import { Injectable } from '@angular/core';
import { EncryptionService} from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private encryprionService: EncryptionService) { }

  set(key: string, data: string) {
    if (data === null) {
      sessionStorage.removeItem(key);
      return;
    }
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    console.log(this.encryprionService.encrypt(data));
    sessionStorage.setItem(key, this.encryprionService.encrypt(data));
  }

  get(key: string) {
    const token = sessionStorage.getItem(key);
    if (token) {
      return this.encryprionService.decrypt(token);
    } else {
      return null;
    }
  }
}
