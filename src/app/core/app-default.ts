import { Select } from '@ngxs/store';
import { AppState } from '../state/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { DBState } from '../state/database/db.state';
import { DrugstoreStateModel } from '../state/drugstore/drugstore.state';

export class AppDefault {

    @Select(AppState.hasMobileMatches)
    stateMobileMatches$!: Observable<any>;
    
    public stateMobileMatchesSubscription$: Subscription;
    
    public hasMobileMatches!: boolean;
    public dbDrugstores!: DrugstoreStateModel[];
    public dbStreets!: any;
    
    constructor() {
        this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
        // this.stateDrugstores$.subscribe(state => this.dbDrugstores = state);
        // this.stateStreets$.subscribe(state => this.dbStreets = state);
    }
}