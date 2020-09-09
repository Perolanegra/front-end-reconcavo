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

  getUpdatedStreets(): void { // return all

  }

  getStreetsByName(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new DBActions.GetStreets())
        .subscribe((state: any) => { // 
          let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
          const filtered = ref.map(street => street.name.includes(payload.name) ? street : null);
          resolve(filtered[0] ? filtered : []);
        });
    });
  }
}
