import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encryptString(valueToEncrypt: string) {
    let encryptedString = CryptoJS.AES.encrypt(valueToEncrypt, environment.encryptionKey);

    for (let index = 0; index < 50; index++) {
      encryptedString = CryptoJS.AES.encrypt(valueToEncrypt, environment.encryptionKey);
      if (encryptedString.toString().indexOf('/') === -1) {
        return encryptedString;
      }
    }
    return encryptedString;
  }


  encrypt(valueToEncrypt: string):string {
    return CryptoJS.AES.encrypt(valueToEncrypt, environment.encryptionKey).toString();
  }

  decrypt(valueToDecrypt: string) {
    if (valueToDecrypt === null) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(valueToDecrypt.toString(), environment.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
