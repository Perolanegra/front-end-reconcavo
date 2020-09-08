import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { DrugstoreActions } from '../state/drugstore/drugstore.actions';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreService {
  public base_url = "drugstores";
  public url: any;

  constructor(private httpClient: HttpClient, private store: Store) { }

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
      const observable = this.store.select(state => state.drugstore);
      observable.subscribe(item => {
        const all = item.map((store: any) => {
          if(store?.name.includes(payload.name)) return store;
        });
        resolve(all);
      })
    });


    // this.url = `${environment.server}/${this.base_url}`;
    // return this.httpClient.get(this.url, payload).toPromise()
    //   .catch(err => alert(err.error.detail));
  }

  public addDrugstore(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DrugstoreActions.SetLocalState(payload))
        .subscribe(resp => {
          if (resp) resolve(resp);
        }).unsubscribe();
    });
    // this.url = `${environment.server}/${this.base_url}`;
    // return this.httpClient.post(this.url, payload, {}).toPromise()
    //   .catch(err => alert(err.error.detail));
  }

}
