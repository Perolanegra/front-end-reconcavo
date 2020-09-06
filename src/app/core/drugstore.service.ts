import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DrugstoreActions } from '../state/drugstore/drugstore.actions';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService {

  constructor(private httpClient: HttpClient) { }

  getStoreByStreet(payload: any) {
    
  }
}
