import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { DrugstoreActions } from 'src/app/state/drugstore/drugstore.actions';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppDefault } from 'src/app/core/app-default';
import { StreetActions } from 'src/app/state/street/street.actions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-edit-drugstore-dialog',
  templateUrl: './edit-drugstore-dialog.component.html',
  styleUrls: ['./edit-drugstore-dialog.component.scss'],
})
export class EditDrugstoreDialogComponent extends AppDefault implements OnInit {

  private fPassResponseSubscription$: Subscription = null as any;
  public drugstore: any;
  public filteredStreets: any;

  constructor(
    public dialogRef: MatDialogRef<EditDrugstoreDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    private store: Store,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit(): void {
    this.drugstore = Object.assign({}, this.data);
    this.drugstore.idNeighborhood = Object.assign({}, this.data.idNeighborhood);
    this.drugstore.foundationDate = new Date(this.drugstore.foundationDate);
  }

  private updateStreetsByName = (value: string) => {
    const payload = { name: value, max_results: 9999 };
    this.store.dispatch(new StreetActions.UpdateStreetsByName(payload))
      .subscribe(resp => {
        this.filteredStreets = resp?.street;
      });
  }

  onStreetKeyUp(ev: any): void {
    if (ev.target?.value) {
      this.drugstore.idNeighborhood.name = ev.target.value;
      if (ev.target.value.length >= 3 && ev.target.value != null && ev.target.value.toString() != '') {
        this.updateStreetsByName(ev.target.value);
      }
    }
  }

  getNameItem(item: any) {
    return item ? item.name : undefined;
  }

  setDate(ev: MatDatepickerInputEvent<any>) {
    this.drugstore.foundationDate = new Date(ev.target.value);
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    this.fPassResponseSubscription$ ? this.fPassResponseSubscription$.unsubscribe() : null;
  }

  selectedStreet(ev: MatAutocompleteSelectedEvent) {
    this.drugstore.idNeighborhood = ev.option.value;
  }

  submit(): void {
    if (this.data) {
      const payload = {};
      this.fPassResponseSubscription$ = this.store.dispatch(new DrugstoreActions.EditDrugstore(this.drugstore))
        .subscribe((resp: any) => {
          if (resp) this.close(true);
        }, (error => {
          this.appController.tratarErro(error);
        }));
    }
  }

}
