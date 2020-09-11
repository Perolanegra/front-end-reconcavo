import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { StreetService } from '../../core/street.service';
import { StreetActions } from './street.actions';

export class StreetStateModel {
    name: any;
    id: any;
}

@State<StreetStateModel>({
    name: 'street',
    defaults: {
        name: null,
        id: null,
    },
})

@Injectable()
export class StreetState {

    constructor(private streetService: StreetService) { }

    @Selector()
    static getName(state: StreetStateModel) {
        return state.name;
    }

    @Selector()
    static getId(state: StreetStateModel) {
        return state.id;
    }

    @Action(StreetActions.AddStreet)
    async addStreetByName({ getState, setState }: StateContext<StreetStateModel>, { payload }: StreetActions.AddStreet) {
        const data = await this.streetService.addStreet(payload);
        if (data) setState(data);
    }

    @Action(StreetActions.EditStreet)
    async editStreet({ getState, setState }: StateContext<StreetStateModel>, { payload }: StreetActions.EditStreet) {
        const data: any = await this.streetService.editStreet(payload);
        if (data) setState(data);
    }

    @Action(StreetActions.GetUpdatedStreets)
    async getUpdatedStreets({ getState, setState }: StateContext<StreetStateModel>, { }: StreetActions.GetUpdatedStreets) {
        const data: any = await this.streetService.getUpdatedStreets();
        if (data) setState(data);
    }

    @Action(StreetActions.GetStreetsByName)
    async getStreetsByName({ getState, setState }: StateContext<StreetStateModel>, { payload }: StreetActions.GetStreetsByName) {
        const data: any = await this.streetService.getStreetsByName(payload);
        if (data) setState(data);
    }

    @Action(StreetActions.RemoveStreetById)
    async removeStreetById({ getState, setState }: StateContext<StreetStateModel>, { payload }: StreetActions.RemoveStreetById) {
        const data: any = await this.streetService.removeStreetById(payload);
        if (data) setState(data);
    }

}