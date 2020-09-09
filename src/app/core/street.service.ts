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

  public addStreet(payload: any): void {
    this.store.dispatch(new DBActions.GetStreets())
      .subscribe((state: any) => { // 
        let ref: Array<any> = Object.assign([], state.db.streets as Array<any>);
        payload.id = ref.length ? ref.length + 1 : 1;
        ref = [payload, ...ref];
        this.store.dispatch(new DBActions.AddStreets(ref));
      });
  }

  getUpdatedStreets(): void { // return all

  }

  updateStreetsByName(payload: any) {

  }
}
