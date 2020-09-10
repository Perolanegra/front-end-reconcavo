import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { DBActions } from '../state/database/db.actions';
import { AppDefault } from './app-default';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService extends AppDefault {
  public base_url = "drugstores";
  public url: any;

  constructor(
    private httpClient: HttpClient,
    private store: Store) {
    super();
  }

  getStoreByStreet(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }

  editDrugstore(payload: any) {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          let refAux: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          ref.map((store, index) => { if (store.id == payload.id) refAux.splice(index, 1) });
          refAux.push(payload);
          this.store.dispatch(new DBActions.AddDrugstores(refAux));
          resolve(refAux);
        });
    });
  }

  removeDrugstoreById(payload: any) {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          let refAux: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          ref.map((store, index) => { if (store.id == payload.id) refAux.splice(index, 1) });
          this.store.dispatch(new DBActions.AddDrugstores(refAux));
          resolve(refAux);
        });
    });
  }

  async getStoresByName(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          const filtered = ref.map(store => store.name.toLowerCase().includes(payload.name.toLowerCase()) ? store : null);
          resolve(filtered[0] ? filtered : []);
        });
    });
  }

  async getStoresByStreetName(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          let refAux: Array<any> = Object.assign([], []);
          ref.map(store => {
            if (store.idNeighborhood.name.toLowerCase().includes(payload.name.toLowerCase())) refAux.push(store);
          });
          resolve(refAux);
        });
    });
  }

  public addDrugstore(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => {
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          ref.map(store => {
            if (store.name.toLowerCase().includes(payload.name.toLowerCase())) reject('Farmácia já cadastrada.');
          });
          payload.id = ref.length ? ref.length + 1 : 1;
          ref = [payload, ...ref];
          this.store.dispatch(new DBActions.AddDrugstores(ref));
          resolve(ref);
        });
    });
  }

}
