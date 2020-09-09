import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { DrugstoreActions } from '../state/drugstore/drugstore.actions';
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
    // this.url = `${environment.server}/${this.base_url}/neighbordhood`;
    // return this.httpClient.get(this.url, payload).toPromise()
    //   .catch(err => alert(err.error.detail));
  }

  editDrugstore(payload: any) {
    return new Promise((resolve, reject) => {
      this.store.select(state => {
        // resolve(state?.drugstore)
        // id
      });
    })
  }

  async removeDrugstoreById(payload: any) {

  }

  getUpdatedStores(): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.select(state => resolve(state?.drugstore));
    });
  }

  getStoresByName(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          const filtered = ref.map(street => street.name.includes(payload.name) ? street : null);
          resolve(filtered[0] ? filtered : []);
        });
    });
  }

  public addDrugstore(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetDrugstores())
        .subscribe((state: any) => {
          let ref: Array<any> = Object.assign([], state.db.drugstores as Array<any>);
          payload.id = ref.length ? ref.length + 1 : 1;
          ref = [payload, ...ref];
          this.store.dispatch(new DBActions.AddDrugstores(ref));
          resolve(ref);
        });
    });
  }

}
