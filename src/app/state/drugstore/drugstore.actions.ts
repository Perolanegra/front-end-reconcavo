export namespace DrugstoreActions {

    export class GetByStreet {
        static readonly type = '[DrugStore] GetByStreet';
        constructor(public payload: { id_neighborhood: number; flg_round_the_clock: boolean; }) { }
    }

    export class Signup {
        static readonly type = '[Auth] Signup';
        constructor(public payload: any) { }
    }

}