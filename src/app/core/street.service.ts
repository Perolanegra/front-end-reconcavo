import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { DBActions } from '../state/database/db.actions';
@Injectable({
  providedIn: 'root'
})
export class StreetService {

  public base_url = "neighborhoods";
  public url: any;

  constructor(private store: Store) { }

  public addStreet(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
          payload.id = ref.length ? ref.length + 1 : 1;
          ref = [payload, ...ref];
          this.store.dispatch(new DBActions.AddStreets(ref));
          resolve(ref);
        });
    });
  }

  async editStreet(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
          let refAux: Array<any> = Object.assign([], state.db.streets as Array<any>);
          ref.map((street, index) => { if (street.id == payload.id) refAux.splice(index, 1) });
          refAux.push(payload);
          this.store.dispatch(new DBActions.AddStreets(refAux));
          resolve(refAux);
        });
    });
  }

  async getStreetsByName(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
          let refAux: Array<any> = Object.assign([], []);
          ref.map(street => {
            if (street.name.toLowerCase().includes(payload.name.toLowerCase())) refAux.push(street);
          });
          resolve(refAux);
        });
    });
  }

  async getUpdatedStreets(): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
          resolve(ref);
        });
    });
  }

  async removeStreetById(payload: any): Promise<any | undefined> {
    console.log('Remove StreetID Service: ', payload);
    
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
          let refAux: Array<any> = Object.assign([], state.db.streets as Array<any>);
          ref.map((street, index) => { if (street.id == payload.id) refAux.splice(index, 1) });
          this.store.dispatch(new DBActions.AddStreets(refAux));
          resolve(refAux);
        });
    });
  }
}
