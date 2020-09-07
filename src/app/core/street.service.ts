import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  constructor() { }

  addStreetByName(paylaod: any) {
    
  }

  getUpdatedStreets(): Promise<any | undefined> { // return all
    return new Promise((resolve, reject) => {
      resolve([
        { id: 6, name: "Farol de Itapua" },
        { id: 6, name: "Linha Verde" },
        { id: 6, name: "Amaralina" },
      ]);
    })
  }

  updateStreetsByName(payload: any) {
    console.log('payload request: ', payload);
    
    return new Promise((resolve, reject) => {
      resolve([
        { id: 6, name: "Farol de Itapua" },
        { id: 6, name: "Linha Verde" },
        { id: 6, name: "Amaralina" },
      ]);
    });
  }

  editById(payload: any) {
    
  }
}
