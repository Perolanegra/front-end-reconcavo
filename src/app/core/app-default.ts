import { Select } from '@ngxs/store';
import { AppState } from '../state/app/app.state';
import { Observable, Subscription } from 'rxjs';

export class AppDefault {

    @Select(AppState.hasMobileMatches)
    stateMobileMatches$!: Observable<any>;
    
    public stateMobileMatchesSubscription$: Subscription;
    
    public hasMobileMatches!: boolean;
    
    constructor() {
        this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
    }
}