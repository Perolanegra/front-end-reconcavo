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
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
      ])
    });
  }

  addDrugstore(payload: any) {

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
      resolve([
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'Drogaria São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
        { name: 'A Fórmula', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'Farmácia do Trabalhador', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'HOI', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
        { name: 'Paulista', id: 1, idNeighborhood: { id: 1, name: "COCO" }, roundTheClock: true, foundationDate: '07/09/2020' },
      ])
    });
  }
}
