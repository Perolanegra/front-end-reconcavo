import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from "@angular/common";
import { StreetActions } from '../../state/street/street.actions';
import { NgFormDefault } from 'src/app/core/ng-form-default';
import { AppController } from 'src/app/core/appController';
import { DrugstoreActions } from 'src/app/state/drugstore/drugstore.actions';

@Component({
    selector: 'app-add-street-dialog',
    templateUrl: './add-store-dialog.component.html',
    styleUrls: ['./add-store-dialog.component.scss'],
})
export class AddStoreDialogComponent extends NgFormDefault implements OnInit, OnDestroy {
    //   @Select(AppState.forgotPassResponse) fPassResponse$: Observable<any>;
    private fPassResponseSubscription$: Subscription = null as any;

    constructor(
        public formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddStoreDialogComponent>,
        protected dialog: MatDialog,
        protected appController: AppController,
        private store: Store,
        protected location: Location,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super(formBuilder, appController, location);
    }

    ngOnInit(): void {
        this.setForm();
    }

    setForm() {
        this.form.addControl('name', new FormControl(null));
        this.form.addControl('roundTheClock', new FormControl(null));
        this.form.addControl('idNeighborhood', new FormControl(null));
        this.form.addControl('foundationDate', new FormControl(null));
    }

    ngOnDestroy() {
        // this.fPassResponseSubscription$ ?? this.fPassResponseSubscription$.unsubscribe();
    }

    getResponse() {
        // this.fPassResponseSubscription$ = this.fPassResponse$.subscribe(async (data) => {
        //   if (data) {
        //     this.close();
        //   }
        // });
    }

    submit(): void {
        if (this.form.valid) {
            this.store.dispatch(new DrugstoreActions.AddDrugstore(this.form.value))
                .subscribe(resp => {
                    if (resp) {
                        console.log('resp: ', resp);
                        this.close(true);
                    }
                }, (error => {
                    this.appController.tratarErro(error);
                }));
        }
    }

    public setErrorValidation() {
        throw new Error("Method not implemented.");
    }

    public setComponentState() {
        throw new Error("Method not implemented.");
    }

    close(data?: any) {
        this.dialogRef.close(data);
    }

}
