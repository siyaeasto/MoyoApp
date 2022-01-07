import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertService } from '../../../service/alert.service';
import { ApiResponseValidatorService } from '../../../service/api-response-validator.service';
import { ApiService } from '../../../service/api.service';
import { StorageService } from '../../../service/storage.service';
import { DataTableDirective } from "angular-datatables";
import { ProductViewModel } from '../../../model/view/product-view-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //@ViewChild(DataTableDirective, { static: false }) DataTableDirective: DataTableDirective
  //DtElement: DataTableDirective;
  @ViewChild(DataTableDirective, { static: false })
  DtElement:any;
  DtOptions: any;
  DtTrigger: Subject<any> | undefined;

  isBusy: boolean = true;
  products: ProductViewModel[] | undefined;

  constructor(
    private _sessionStorageService: StorageService,
    private _apiService: ApiService,
    private _router: Router,
    private zone: NgZone,
    private _apiResponseValidatorService: ApiResponseValidatorService,
    private _alertService: AlertService
  ) { this.products = [] }

  ngOnInit(): void {
    this.getProducst();

    const cols = [0, 1, 2, 3, 4, 5];
    this.DtOptions = {
      pagingType: "full_numbers",
      dom: "Bfrtip",
      order: [5, "desc"],
      pageLength: "10",
      buttons: [
        {
          extend: "copyHtml5",
          exportOptions: {
            columns: cols,
          },
        },
        {
          extend: "excelHtml5",
          exportOptions: {
            columns: cols,
          },
        },
        {
          extend: "csvHtml5",
          exportOptions: {
            columns: cols,
          },
        },
        {
          extend: "pdfHtml5",
          exportOptions: {
            columns: cols,
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: cols,
          },
        },
      ],
    };
    this.DtTrigger = new Subject();
  }


  async getProducst() {
    // this.axios.request("products/byFilter/active&true", "get").then(
    this.isBusy = true;
    let response = await this._apiService.request("product", "get");
    if (this._apiResponseValidatorService.isValid(response)) {
      this.products = response.data as ProductViewModel[];
    }
    this.isBusy = false;
  }

  update(productId: number | undefined) {
    this._router.navigate(["products/save-product/" + productId]);
  }

  getDateValue(date: string) {
    return new Date(date).valueOf();
  }
}
