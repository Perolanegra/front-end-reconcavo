import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DrugstoreActions } from './drugstore.actions';
import { DrugstoreService } from 'src/app/core/drugstore.service';

export class DrugstoreStateModel {
    name: any;
    id: any;
    idNeighborhood: any;
    roundTheClock: any;
    foundationDate: any
}

@State<DrugstoreStateModel>({
    name: 'drugstore',
    defaults: {
        name: null,
        id: null,
        idNeighborhood: { id: null, name: null },
        roundTheClock: null,
        foundationDate: null
    },
})

@Injectable()
export class DrugstoreState {

    constructor(private drugstoreService: DrugstoreService) { }

    @Selector()
    static getName(state: DrugstoreStateModel) {
        return state.name;
    }

    @Selector()
    static getId(state: DrugstoreStateModel) {
        return state.id;
    }

    @Selector()
    static getStreetEntity(state: DrugstoreStateModel) {
        return state.idNeighborhood;
    }

    @Selector()
    static has24hour(state: DrugstoreStateModel) {
        return state.roundTheClock;
    }

    @Selector()
    static foundationDate(state: DrugstoreStateModel) {
        return state.foundationDate;
    }

    @Action(DrugstoreActions.GetByStreet)
    async signIn({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.GetByStreet) {

        const data: any = await this.drugstoreService.getStoreByStreet(payload);

        if (data) {
            // const resp = await this.drugstoreService.getUserByToken(data.access_token).toPromise();
            const state = getState();
            setState({
                ...state,
                // resp
            });
        }
    }


}