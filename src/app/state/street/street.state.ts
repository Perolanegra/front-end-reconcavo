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
    addStreetByName({ getState, setState }: StateContext<StreetStateModel>, { payload }: StreetActions.AddStreet) {
        this.streetService.addStreet(payload);
    }

    @Action(StreetActions.GetUpdatedStreets)
    async getUpdatedStreets({ getState, setState }: StateContext<StreetStateModel>, {}: StreetActions.GetUpdatedStreets) {
        const data: any = await this.streetService.getUpdatedStreets();
        if(data) {
            setState(data);
        }
    }

    @Action(StreetActions.UpdateStreetsByName)
    async updateStreetsByName({ getState, setState }: StateContext<StreetStateModel>, { payload }: StreetActions.UpdateStreetsByName) {
        const data: any = await this.streetService.updateStreetsByName(payload);
        if(data) {
            setState(data);
        }
    }

}