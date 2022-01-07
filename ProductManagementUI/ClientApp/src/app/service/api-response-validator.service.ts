import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiResponseValidatorService {
  Title: string;
  Message: string;

  constructor(private _alertService: AlertService) {
    this.Title = 'An Error Occured.';
    this.Message = 'An unexpected error occured. Please contact your system administrator.';
  }

  isValid(response: AxiosResponse): boolean {
    if (response.status !== 200) {
      this._alertService.displayErrorMessage(this.Title, this.Message);

      return false;
    }

    return true;
  }

  displayErrorMessage() {
    this._alertService.displayErrorMessage(this.Title, this.Message);
  }
}
