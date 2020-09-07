import { DrugstoreStateModel } from './drugstore.state';

export namespace DrugstoreActions {

    export class GetByStreetId {
        static readonly type = '[DrugStore] GetByStreet';
        constructor(public payload: { id_neighborhood: number; flg_round_the_clock: boolean; }) { }
    }

    export class AddDrugstore {
        static readonly type = '[Drugstore] AddDrugstore';
        constructor(public payload: DrugstoreStateModel) { }
    }

    export class GetUpdatedStores {
        static readonly type = '[Drugstore] getUpdatedStores';
    }

    export class UpdateStoreByName {
        static readonly type = '[Drugstore] UpdateStoreByName';
        constructor(public payload: { name: string }) { }
    }

    



}