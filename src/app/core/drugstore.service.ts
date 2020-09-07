import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService {

  constructor(private httpClient: HttpClient) { }

  getStoreByStreet(payload: any): Promise<any> {
    // this.httpClient.get(payload)
    return new Promise((resolve, reject) => {
      resolve([
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
      ])
    });
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
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.server}/endpoint`;
        resolve(this.httpClient.get(url, { params: payload }));
      } catch (error) {
        reject(error);
      }
    });
  }

  public addDrugstore(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.server}/endpoint`;
        resolve(this.httpClient.post(url, payload, {}));
      } catch (error) {
        reject(error);
      }
    });
  }

}
