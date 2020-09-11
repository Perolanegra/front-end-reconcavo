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
    static getEntity(state: DrugstoreStateModel) {
        return state;
    }

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

    @Action(DrugstoreActions.GetByStreetId)
    async getByStreetId({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.GetByStreetId) {
        const data: any = await this.drugstoreService.getStoreByStreet(payload);

        if (data) {
            setState(data);
        }
    }

    @Action(DrugstoreActions.AddDrugstore)
    async addDrugstore({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.AddDrugstore) {
        try {
            const data = await this.drugstoreService.addDrugstore(payload);
            if (data) setState(data);
        } catch (error) {
            throw error;
        }
    }

    @Action(DrugstoreActions.EditDrugstore)
    async editDrugstore({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.EditDrugstore) {
        const data: any = await this.drugstoreService.editDrugstore(payload);
        if (data) setState(data);
    }

    @Action(DrugstoreActions.GetUpdatedStores)
    async getUpdatedStores({ getState, setState }: StateContext<DrugstoreStateModel>, { }: DrugstoreActions.GetUpdatedStores) {
        const data: any = await this.drugstoreService.getUpdatedStores();
        if (data) setState(data);
    }

    @Action(DrugstoreActions.GetStoreByName)
    async getStoresByName({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.GetStoreByName) {
        const data: any = await this.drugstoreService.getStoresByName(payload);
        if (data) setState(data);
    }

    @Action(DrugstoreActions.GetStoresByStreetName)
    async getStoresByStreetName({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.GetStoresByStreetName) {
        const data: any = await this.drugstoreService.getStoresByStreetName(payload);
        if (data) setState(data);
    }

    @Action(DrugstoreActions.RemoveDrugstoreById)
    async removeDrugstoreById({ getState, setState }: StateContext<DrugstoreStateModel>, { payload }: DrugstoreActions.RemoveDrugstoreById) {
        const data: any = await this.drugstoreService.removeDrugstoreById(payload);
        if (data) setState(data);
    }

}