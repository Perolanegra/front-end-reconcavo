export namespace StreetActions {

    export class AddStreetByName {
        static readonly type = '[Street] AddStreetByName';
        constructor(public payload: { name: string }) { }
    }

    export class SetCurrentState {
        static readonly type = '[Street] SetCurrentState';
        constructor(public payload: { name: string; id: number }) { }
    }

    export class GetUpdatedStreets {
        static readonly type = '[Street] GetUpdatedStreets';
    }

    export class UpdateStreetsByName {
        static readonly type = '[Street] UpdateStreetsByName';
        constructor(public payload: { name: string }) { }
    }
    

}