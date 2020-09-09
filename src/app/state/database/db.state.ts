import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DBActions } from './db.actions';

@State<any>({
    name: 'db',
    defaults: {
        drugstores: null,
        streets: null,
    },
})

@Injectable()
export class DBState {

    @Selector()
    static getDrugstores(state: any) {
        return state.drugstores;
    }

    @Selector()
    static getStreets(state: any) {
        return state.streets;
    }


    @Action(DBActions.AddDrugstores)
    async addDrugstores({ getState, setState }: StateContext<any>, { payload }: DBActions.AddDrugstores) {
        const state = getState();
        setState({
            ...state,
            drugstores: payload
        });
    }

    @Action(DBActions.AddStreets)
    async addStreets({ getState, setState }: StateContext<any>, { payload }: DBActions.AddStreets) {
        const state = getState();
        setState({
            ...state,
            streets: payload
        });
    }


}