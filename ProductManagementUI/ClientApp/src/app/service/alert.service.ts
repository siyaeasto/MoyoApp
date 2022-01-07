import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import swal, { SweetAlertResult } from 'sweetalert2';

@Injectable()
export class AlertService {
  displayErrorMessage(title: string, message: string): Promise<boolean> {
    return swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok',
      //confirmButtonClass: 'btn',
      buttonsStyling: true,
      allowOutsideClick: false
    }).then(function(ok) {
      return true;
    });

  }

  displayWarningMessage(title: string, message: string): void {
    swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ok',
      //confirmButtonClass: 'btn',
      buttonsStyling: true,
      allowOutsideClick: false
    });
  }

  displaySuccesMessage(title: string, message: string): Promise<SweetAlertResult> {
    return swal.fire({
      text: message,
      title,
      icon: 'success',
      confirmButtonText: 'OK',
      //confirmButtonClass: 'btn',
      buttonsStyling: true,
      confirmButtonColor: '#01C1D6',
      allowOutsideClick: false
    });
  }

  displayConfirmationMessage(title: string, message: string): Promise<SweetAlertResult> {
    return swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ok',
      //confirmButtonClass: 'btn pull-right',
      showCancelButton: true,
      //cancelButtonClass: 'btn pull-left',
      buttonsStyling: true,
      allowOutsideClick: false
    });
  }

  displayDeclinedConfirmationMessage(title: string): Promise<SweetAlertResult> {
    return swal.fire({
      title,
      icon: 'warning',
      confirmButtonText: 'Ok',
      //confirmButtonClass: 'btn pull-right',
      showCancelButton: true,
      //cancelButtonClass: 'btn pull-left',
      buttonsStyling: true,
      allowOutsideClick: false,
      html: '<p><input id="input-field">',
    });
  }

  displayDefaultValidationErrorMessage(): Promise<boolean> {
    return this.displayErrorMessage('Errors on Page.', 'Please fix all errors on the page and try again.');
  }

  displaySessionExpiredMessage(): Promise<boolean> {
    return this.displayErrorMessage('Session Expired', 'Please login again');
  }
}
