import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductViewModel } from '../../../model/view/product-view-model';
import { AlertService } from '../../../service/alert.service';
import { ApiResponseValidatorService } from '../../../service/api-response-validator.service';
import { ApiService } from '../../../service/api.service';
import { EncryptionService } from '../../../service/encryption.service';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css']
})
export class ProductSaveComponent implements OnInit {
  isBusy: boolean = false;
  product: ProductViewModel = new ProductViewModel;
  productId!: number;
  failure!: string;
  productForm!: FormGroup;
  nameMessage!: string;
  descriptionMessage!: string;
  isSubmitted: boolean = false;
  busy: boolean = false;
  dropdownSettings!: {};
  constructor(
    private route: ActivatedRoute,
    private _apiResponseValidatorService: ApiResponseValidatorService,
    private axios: ApiService,
    private _router: Router,
    private fb: FormBuilder,
    private _alertServicet: AlertService,
    private _encryptionService: EncryptionService
  ) { }

  ngOnInit() {
    this.product = new ProductViewModel();
    this.createUpdateForm();
    this.route.params.subscribe((params: any) => {
      this.productId = params.productId;
      if (this.productId) {
        this.getProduct();
      } else {
      }
    });

    //this.setOnChangeValidators();
  }

  getProduct() {
    this.isBusy = true;
    this.axios.request("products/" + this.productId, "get").then(
      (response) => {
        this._apiResponseValidatorService.isValid(response);
        if (response.status === 200) {
          this.product = response.data.data as ProductViewModel;
        } else {
          this.failure = "product not found with id :" + this.product;
          this._apiResponseValidatorService.displayErrorMessage();
        }
        this.isBusy = false;
      },
      (error) => {
        //this.setError(error);
        this.isBusy = false;
      }
    );
  }

  createUpdateForm() {
    this.productForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      isActive: [],
      items: [],
      vehicleTypes: [],
    });
  }
}
