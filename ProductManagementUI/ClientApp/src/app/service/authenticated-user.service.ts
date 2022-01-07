import { Injectable, EventEmitter } from '@angular/core';
import { AuthenticateUserResponse } from './../model/response/authenticate-user-response';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Service } from '../models/service';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class AuthenticatedUserService extends Service {
  public changePasswordChanged$: EventEmitter<UserViewModel>;
  LoggedInUser: UserViewModel;
  AuthenticateUserResponse: AuthenticateUserResponse;

  constructor(private _sessionStorageService: StorageService, private router: Router, private _http: HttpClientModule) {
    super();
    this.AuthenticateUserResponse = JSON.parse(this._sessionStorageService.get('authenticateUserResponse'));
    this.changePasswordChanged$ = new EventEmitter();
  }

  getUser() {
    this.AuthenticateUserResponse = JSON.parse(this._sessionStorageService.get('authenticateUserResponse'));
    if (this.AuthenticateUserResponse !== null) {
      return this.AuthenticateUserResponse.data;
    } else {
      return null;
    }
  }

  isAuthenticateUserResponseUndefined(): boolean {
    return this.AuthenticateUserResponse === null || typeof this.AuthenticateUserResponse === 'undefined';
  }

  flagChangePassword() {
    this.AuthenticateUserResponse = JSON.parse(this._sessionStorageService.get('authenticateUserResponse'));
    this.AuthenticateUserResponse.data.incorrectPasswords = 3;
    this._sessionStorageService.set('authenticateUserResponse', JSON.stringify(this.AuthenticateUserResponse));
    this.changePasswordChanged$.emit(JSON.parse(this._sessionStorageService.get('authenticateUserResponse')));
  }

  getUsername(): string {
    return this.AuthenticateUserResponse.data.name + ' ' + this.AuthenticateUserResponse.data.surname;
  }

}
