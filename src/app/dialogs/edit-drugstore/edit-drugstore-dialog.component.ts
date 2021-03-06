import { Component, OnInit, Renderer2, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { DrugstoreActions } from 'src/app/state/drugstore/drugstore.actions';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppDefault } from 'src/app/core/app-default';
import { StreetActions } from 'src/app/state/street/street.actions';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-drugstore-dialog',
  templateUrl: './edit-drugstore-dialog.component.html',
  styleUrls: ['./edit-drugstore-dialog.component.scss'],
})
export class EditDrugstoreDialogComponent extends AppDefault implements OnInit {

  @ViewChild(MatAutocompleteTrigger) autocomplete?: MatAutocompleteTrigger;

  private storeSubscription$: Subscription = null as any;
  public drugstore: any;
  public filteredStreets: any;

  constructor(
    public dialogRef: MatDialogRef<EditDrugstoreDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    private store: Store,
    private dateAdapter: DateAdapter<any>,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit(): void {
    this.setComponentState();
  }

  private setComponentState(): void {
    this.dateAdapter.setLocale('pt-BR');
    this.drugstore = Object.assign({}, this.data);
    this.drugstore.idNeighborhood = Object.assign({}, this.data.idNeighborhood);
    const parts = this.drugstore.foundationDate.split("/");
    this.drugstore.foundationDate = new Date(parts[2], parts[1] - 1, parts[0]);
  }

  private getStreetsByName = (value: string) => {
    const payload = { name: value, max_results: 99999 };
    this.store
      .dispatch(new StreetActions.GetStreetsByName(payload))
      .subscribe((resp) => {
        this.filteredStreets = Object.assign([], resp?.street as Array<any>);
      });
  }

  onStreetKeyUp(ev: KeyboardEvent): void {
    if ((ev.target as any)?.value) {
      this.verifyLastChar(ev);
      this.drugstore.idNeighborhood.id = 0;
      this.drugstore.idNeighborhood.name = (ev.target as any).value;
      if ((ev.target as any).value.length >= 3 && (ev.target as any).value != null && (ev.target as any).value.toString() != '') {
        this.getStreetsByName((ev.target as any).value);
      }
    }
  }

  public verifyLastChar = (ev: KeyboardEvent) => {
    if (ev.code === 'Backspace' && (ev.target as any)?.value.length <= 1) this.autocomplete?.closePanel();
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
    this.storeSubscription$ ? this.storeSubscription$.unsubscribe() : null;
  }

  selectedStreet(ev: MatAutocompleteSelectedEvent) {
    this.drugstore.idNeighborhood = ev.option.value;
  }

  async submit() {
    try {
      const valid = await this.validate();
      if (valid) {
        this.drugstore.foundationDate = new Date(this.drugstore.foundationDate).toLocaleDateString()
        this.storeSubscription$ = this.store.dispatch(new DrugstoreActions.EditDrugstore(this.drugstore))
          .subscribe((resp: any) => { if (resp) this.close(true); }, (
            error => this.appController.tratarErro(error)));
      }
    } catch (error) {
      alert(error);
    }

  }

  async validate(): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      Object.keys(this.drugstore).some((key, index) => {
        if (!this.drugstore.idNeighborhood.id || this.drugstore[key] === null) {
          reject('Dados preenchidos incorretamente.');
        } else {
          if (index === 4) resolve(true);
        }
      });
    });
  }

}
