import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { DBActions } from '../state/database/db.actions';
@Injectable({
  providedIn: 'root'
})
export class StreetService {

  public base_url = "neighborhoods";
  public url: any;

  constructor(private httpClient: HttpClient, private store: Store) { }

  public addStreet(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => {
          let ref = state.db.streets as Array<any>
          ref ? ref.push(payload) : ref = [payload];
          this.store.dispatch(new DBActions.AddStreets(ref));
        });
    });
  }

  getUpdatedStreets(): Promise<any | undefined> { // return all
    this.url = `${environment.server}/${this.base_url}`;
    return new Promise((resolve, reject) => {

    });
    // return this.httpClient.get(this.url, {}).toPromise()
    //   .catch(err => alert(err.error.detail));
  }

  updateStreetsByName(payload: any) {
    this.url = `${environment.server}/${this.base_url}/name`;
    return new Promise((resolve, reject) => {

    });
    // return this.httpClient.get(this.url, payload).toPromise()
    //   .catch(err => alert(err.error.detail));
  }
}
