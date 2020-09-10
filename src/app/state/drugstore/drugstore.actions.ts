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

    export class GetStoreByName {
        static readonly type = '[Drugstore] GetStoreByName';
        constructor(public payload: { name: string, max_results: number }) { }
    }

    export class EditDrugstore {
        static readonly type = '[Drugstore] EditDrugstore';
        constructor(public payload: DrugstoreStateModel) { }
    }

    export class RemoveDrugstoreById {
        static readonly type = '[Drugstore] RemoveDrugstoreById';
        constructor(public payload: { id: number }) { }
    }
    
    export class GetStoresByStreetName {
        static readonly type = '[Street] GetStoresByStreetName';
        constructor(public payload: { name: string, max_results: number }) { }
    }

}