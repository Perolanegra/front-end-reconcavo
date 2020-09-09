import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from "@angular/common";
import { StreetActions } from '../../state/street/street.actions';
import { NgFormDefault } from 'src/app/core/ng-form-default';
import { AppController } from 'src/app/core/appController';
import { DrugstoreActions } from 'src/app/state/drugstore/drugstore.actions';

@Component({
    selector: 'app-add-drugstore-dialog',
    templateUrl: './add-store-dialog.component.html',
    styleUrls: ['./add-store-dialog.component.scss'],
})
export class AddStoreDialogComponent extends NgFormDefault implements OnInit {
    public filteredStreets: any;

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
        this.appController.handleAutoCompleteEntity(
            this.formControls.idNeighborhood,
            this.formControls.street,
            this.getStreetsByName
        );
    }

    setForm() {
        this.form.addControl('name', new FormControl(null));
        this.form.addControl('roundTheClock', new FormControl(null));
        this.form.addControl('street', new FormControl(null));
        this.form.addControl('idNeighborhood', new FormControl(null));
        this.form.addControl('foundationDate', new FormControl(null));
    }

    selected(ev: any): void {

    }

    private getStreetsByName = (value: string) => {
        const payload = { name: value, max_results: 9999999 };
        this.store.dispatch(new StreetActions.GetStreetsByName(payload))
            .subscribe(resp => {
                this.filteredStreets = resp?.street;
            });
    }

    submit(): void {
        if (this.form.valid) {
            const { street, ...payload } = this.form.value;
            this.store.dispatch(new DrugstoreActions.AddDrugstore(payload));
            this.close(true);
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
