import { StreetStateModel } from './street.state';

export namespace StreetActions {

    export class AddStreet {
        static readonly type = '[Street] AddStreet';
        constructor(public payload: { name: string }) { }
    }

    export class SetCurrentState {
        static readonly type = '[Street] SetCurrentState';
        constructor(public payload: { name: string; id: number }) { }
    }

    export class GetUpdatedStreets {
        static readonly type = '[Street] GetUpdatedStreets';
    }

    export class GetStreetsByName {
        static readonly type = '[Street] GetStreetsByName';
        constructor(public payload: { name: string, max_results: number }) { }
    }

    export class EditStreet {
        static readonly type = '[Street] EditStreet';
        constructor(public payload: StreetStateModel) { }
    }

    export class RemoveStreetById {
        static readonly type = '[Street] RemoveStreetById';
        constructor(public payload: { id: number }) { }
    }

}