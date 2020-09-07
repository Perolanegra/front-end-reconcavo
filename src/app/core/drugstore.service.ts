import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService {
  public base_url = "drugstores";
  public url: any;

  constructor(private httpClient: HttpClient) { }

  getStoreByStreet(payload: any): Promise<any> {
    this.url = `${environment.server}/${this.base_url}/neighbordhood`;
    return this.httpClient.get(this.url, payload).toPromise()
      .catch(err => alert(err.error.detail));
  }

  editDrugstore(payload: any) {

  }

  async removeDrugstoreById(payload: any) {

  }

  getUpdatedStores(): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      resolve([
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
      ])
    });
  }

  getStoresByName(payload: any): Promise<any | undefined> {
    console.log(payload);

    this.url = `${environment.server}/${this.base_url}`;
    return this.httpClient.get(this.url, payload).toPromise()
      .catch(err => alert(err.error.detail));
  }

  public addDrugstore(payload: any): Promise<any | undefined> {
    this.url = `${environment.server}/${this.base_url}`;
    return this.httpClient.post(this.url, payload, {}).toPromise()
      .catch(err => alert(err.error.detail));
  }

}
