import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService {

  constructor(private httpClient: HttpClient) { }

  getStoreByStreet(payload: any): Promise<any> {

    // this.httpClient.get(payload)

    return new Promise((resolve, reject) => {
      resolve([
        { name: 'FOdasse mudei', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Sao paulo', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: false, foundationDate: '07/09/2020' },
      ])
    });
  }
}
