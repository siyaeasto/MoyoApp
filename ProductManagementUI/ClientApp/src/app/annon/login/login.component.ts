import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { ApiResponseValidatorService } from '../../service/api-response-validator.service';
import { ApiService } from '../../service/api.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        Validators.compose([Validators.required]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

   loginForm = new FormGroup({});
   isBusy: boolean = false;
  constructor(
    private _apiResponseValidatorService: ApiResponseValidatorService,
    private _alertService: AlertService,
    private _router: Router,
    private _storageService: StorageService,
    private formBuilder: FormBuilder,
    private _apiService: ApiService
  ) { }

  submit() {
    if (!this.loginForm.valid) {
      this._alertService.displayDefaultValidationErrorMessage().then(() => {
      });
      return;
    }
    this.login();
  }
  async login() {
    this.isBusy = true;
    let response;
    try {
      const data = this.loginForm.value;
      data["returnSecureToken"] = true;
      response = await this._apiService.request('Auth', "post", data);
      if (this._apiResponseValidatorService.isValid(response)) {
        //if (userData.data[0]?.roleName === "Admin") {
        //  this._storageService.set("accessToken", response.data.idToken);
        //  this._storageService.set("user", response.data);
        //  this._storageService.set("userData", userData.data[0]);

        //  this._router.navigate(["dashboard"]);
        //} else {
        //  this._alertService.displayErrorMessage(
        //    "Not Allowed",
        //    "You do not have the permission to access this page."
        //  );
        //}
        this._storageService.set("accessToken", response.data.accessToken);
        this._storageService.set("user", response.data.user);
        this._router.navigate(["products"]);
      }
      this.isBusy = false;
    } catch (error) {
      //console.log(error);
      //this._apiResponseValidatorService.isValid(error)
      //if (error.response) {
      //  if (
      //    error.response.data.error.message === "INVALID_PASSWORD" ||
      //    error.response.data.error.message === "EMAIL_NOT_FOUND"
      //  ) {
      //    this._alertService.displayErrorMessage(
      //      "Login Failure",
      //      "Incorrect credentials entered"
      //    );
      //    return;
      //  }
      //  this._alertService.displayErrorMessage("Login Failure", error.message);
      //}
      this.isBusy = false;
    }
  }
}
