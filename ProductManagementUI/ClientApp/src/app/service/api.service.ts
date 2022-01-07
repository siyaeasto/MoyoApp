import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  public instance: any;
  constructor(private storage: StorageService) {
    this.instance = axios.create({
      baseURL: environment.apiUrl,
      headers: { Authorization: `Bearer ${this.storage.get('accessToken')}` }
    });


  }
  ngOnInit() {
  }


  request(route: string, method: any, data? : any) {
    return axios({
      baseURL: environment.apiUrl + route,
      data,
      headers: { Authorization: `Bearer ${this.storage.get('accessToken')}` },
      method
    });
  }
}
