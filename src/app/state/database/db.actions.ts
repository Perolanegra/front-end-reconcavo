import { DrugstoreStateModel } from '../drugstore/drugstore.state';
import { StreetStateModel } from '../street/street.state';

export namespace DBActions {

    export class AddDrugstores {
        static readonly type = '[DBActions] AddDrugstores';
        constructor(public payload: DrugstoreStateModel[]) { }
    }

    export class AddStreets {
        static readonly type = '[DBActions] AddStreets';
        constructor(public payload: StreetStateModel[]) { }
    }

    export class GetDrugstores {
        static readonly type = '[DBActions] GetDrugstores';
    }

    export class GetStreets {
        static readonly type = '[DBActions] GetStreets';
    }

}