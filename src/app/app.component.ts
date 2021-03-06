import { Component, ChangeDetectorRef, TemplateRef, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AppController } from './core/appController';
import { NgFormDefault } from './core/ng-form-default';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { EditDrugstoreDialogComponent } from './dialogs/edit-drugstore/edit-drugstore-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { DrugstoreActions } from './state/drugstore/drugstore.actions';
import { Store } from '@ngxs/store';
import { DrugstoreDetailDialogComponent } from './dialogs/detail-drugstore/detail-drugstore-dialog.component';
import { AppActions } from './state/app/app.actions';
import { AddStreetDialogComponent } from './dialogs/add-street/add-street-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { StreetActions } from './state/street/street.actions';
import { AddStoreDialogComponent } from './dialogs/add-drugstore/add-store-dialog.component';
import { trigger, state, style } from '@angular/animations';
import { DateAdapter } from '@angular/material/core';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hasMaxResults', [
      state('disabled', style({ opacity: '0.4', 'pointer-events': 'none' })),
      state('enabled', style({ opacity: '1', 'pointer-events': 'auto' })),
    ]),
  ],
})
export class AppComponent extends NgFormDefault { // falta so fazer o Farmácias por Bairro

  @ViewChildren(MatAutocompleteTrigger)
  public autocompletes?: QueryList<MatAutocompleteTrigger>;

  public filteredStreets: any;
  public filteredStreetsQuery: any;
  public filteredDrugstores: any;
  public filteredDrugstoresQuery: any;
  public hasMaxResultState = 'disabled';

  public mobileQuery: MediaQueryList;
  public editDrugstoreDialogComponentRef = EditDrugstoreDialogComponent;
  public addEditStreetDialogComponentRef = AddStreetDialogComponent;
  public addStoreDialogComponentRef = AddStoreDialogComponent;

  constructor(
    protected appController: AppController,
    protected formBuilder: FormBuilder,
    private store: Store,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private dateAdapter: DateAdapter<any>,
    protected location: Location
  ) {
    super(formBuilder, appController, location);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.setComponentState();
  }

  setComponentState(): void {
    this.dateAdapter.setLocale('pt-BR');
    this.store.dispatch(new AppActions.SetMediaScreen(this.mobileQuery.matches));
    this.setForm();
    this.appController.handleAutoCompleteEntity(
      this.formControls.drugstore,
      this.formControls.drugstoreId,
      this.getDrugstoreByName
    );
    this.appController.handleAutoCompleteEntity(
      this.formControls.street,
      this.formControls.streetId,
      this.getStreetsByName
    );
    this.appController.handleAutoCompleteEntity(
      this.formControls.storeByStreet,
      this.formControls.storeByStreetId,
      this.getStoresByStreetName
    );

    this.getUpdatedStores();
    this.getUpdatedStreets();
  }

  setForm(): void {
    this.form.addControl('street', new FormControl(null));
    this.form.addControl('streetId', new FormControl(null));
    this.form.addControl('drugstore', new FormControl(null));
    this.form.addControl('drugstoreId', new FormControl(null));
    this.form.addControl('storeByStreet', new FormControl(null));
    this.form.addControl('storeByStreetId', new FormControl(null));
    this.form.addControl('max_results', new FormControl(null));
    this.form.addControl('flg_round_the_clock', new FormControl(null));
  }

  setMaxResultState(ev: any): void {
    this.hasMaxResultState = ev.target.value ? 'enabled' : 'disabled';
  }

  private getDrugstoreByName = (value: string) => {
    const payload = { name: value, max_results: this.form.value.max_results };
    this.store
      .dispatch(new DrugstoreActions.GetStoreByName(payload))
      .subscribe((resp) => {
        this.filteredDrugstoresQuery = Object.assign([], resp?.drugstore as Array<any>);
      });
  }

  private getStreetsByName = (value: string) => {
    const payload = { name: value, max_results: this.form.value.max_results };
    this.store
      .dispatch(new StreetActions.GetStreetsByName(payload))
      .subscribe((resp) => {
        this.filteredStreetsQuery = Object.assign([], resp?.street as Array<any>);
      });
  }

  private getStoresByStreetName = (value: string) => {
    const payload = { name: value, max_results: this.form.value.max_results };
    this.store
      .dispatch(new DrugstoreActions.GetStoresByStreetName(payload))
      .subscribe((resp) => {
        this.filteredDrugstoresQuery = Object.assign([], resp?.drugstore as Array<any>);
      });
  }

  selectStoreByStreet(ev: MatAutocompleteSelectedEvent): void {
    const payload = { drugstore: [{ ...ev.option.value }] };
    this.openModal('', payload, DrugstoreDetailDialogComponent, 'drugstore');
  }

  openModal(formControlName: string, payload: any,
    component: ComponentType<any> | TemplateRef<any>, type?: any) {
    const dialogRef = this.appController.openDialog(payload, component);
    dialogRef.afterClosed().subscribe((dataEmitted) => {
      if (dataEmitted) {
        this.form.get(formControlName)?.setValue(dataEmitted);
        if (type) {
          if (type === 'street') this.getUpdatedStreets();
          else if (type === 'drugstore') this.getUpdatedStores();
        }
      }
    });
  }

  public verifyLastChar = (ev: KeyboardEvent) => {
    if (ev.code === 'Backspace' && (ev.target as any)?.value.length <= 1) {
      this.autocompletes?.map((autocomplete: MatAutocompleteTrigger) => {
        autocomplete.panelOpen ? autocomplete.closePanel() : null;
      });
    }
  }

  public getUpdatedStreets() {
    this.store.dispatch(new StreetActions.GetUpdatedStreets())
      .subscribe((resp) => {
        this.filteredStreets = Object.assign([], resp?.street as Array<any>);
      });
  }

  public getUpdatedStores() {
    this.store.dispatch(new DrugstoreActions.GetUpdatedStores())
      .subscribe((resp) => {
        this.filteredDrugstores = Object.assign([], resp?.drugstore as Array<any>);
      });
  }

  public removeDrugstoreById(payload: any): void {
    this.store.dispatch(new DrugstoreActions.RemoveDrugstoreById({ id: payload.id }))
      .subscribe((resp) => {
        if (resp) {
          this.getUpdatedStores();
        }
      });
  }

  public removeStreetById(payload: any): void {
    this.store.dispatch(new StreetActions.RemoveStreetById({ id: payload.id }))
      .subscribe((resp) => {
        if (resp) {
          this.getUpdatedStreets();
        }
      });
  }
}
