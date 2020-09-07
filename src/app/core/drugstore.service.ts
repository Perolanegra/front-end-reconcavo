import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService {
  public base_url = "drugstores";


  constructor(private httpClient: HttpClient) { }

  getStoreByStreet(payload: any): Promise<any> {
    console.log("payload ",payload);

    const url = `${environment.server}/${this.base_url}/neighbordhood`;
    return this.httpClient.get(url, { params: payload }).toPromise()
      .catch(err => alert(err.error.detail));
  }

  editDrugstore(payload: any) {

  }

  async removeDrugstoreById(payload: any) {

  }

  getUpdatedStores(): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  getStoresByName(payload: any): Promise<any | undefined> {
    const url = `${environment.server}/${this.base_url}`;
    return this.httpClient.get(url, { params: payload }).toPromise()
      .catch(err => alert(err.error.detail));
  }

  public addDrugstore(payload: any): Promise<any | undefined> {
    const url = `${environment.server}/${this.base_url}`;
    return this.httpClient.post(url, payload, {}).toPromise()
      .catch(err => alert(err.error.detail));
  }

}
