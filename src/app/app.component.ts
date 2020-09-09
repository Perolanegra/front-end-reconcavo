import { Component, ChangeDetectorRef, TemplateRef } from '@angular/core';
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
export class AppComponent extends NgFormDefault {
  public filteredStreets: any;
  public filteredDrugstores: any;
  public hasMaxResultState = 'disabled';

  public mobileQuery: MediaQueryList;
  public EditDrugstoreDialogComponent = EditDrugstoreDialogComponent;
  public addStreetDialogComponent = AddStreetDialogComponent;
  public addStoreDialogComponent = AddStoreDialogComponent;

  constructor(
    protected appController: AppController,
    protected formBuilder: FormBuilder,
    private store: Store,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    protected location: Location
  ) {
    super(formBuilder, appController, location);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() { //terminei o add, agr fazer o get drugstore e streets
    this.store.dispatch(new AppActions.SetMediaScreen(this.mobileQuery.matches));
    this.setForm();
    this.appController.handleAutoCompleteEntity(
      this.formControls.drugstore,
      this.formControls.drugstoreId,
      this.updateDrugstoreByName
    );
    this.appController.handleAutoCompleteEntity(
      this.formControls.street,
      this.formControls.streetId,
      this.getStreetsByName
    );
    this.appController.handleAutoCompleteEntity(
      this.formControls.storeByStreet,
      this.formControls.storeByStreetId,
      this.getStreetsByName
    );
    // this.addStreet(
    //   { name: 'Centro - Nazaré' },
    // );

    // this.addDrug({
    //   name: 'A Fórmula',
    //   idNeighborhood: { id: 1, name: 'COCO' },
    //   roundTheClock: true,
    //   foundationDate: '07/09/2020',
    // });
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

  addStreet(params: any) {
    this.store.dispatch(new StreetActions.AddStreet(params));
  }

  addDrug(params: any) {
    this.store.dispatch(new DrugstoreActions.AddDrugstore(params));
  }

  setMaxResultState(ev: any): void {
    this.hasMaxResultState = ev.target.value ? 'enabled' : 'disabled';
  }

  private updateDrugstoreByName = (value: string) => {
    const payload = { name: value, max_results: this.form.value.max_results };
    this.store
      .dispatch(new DrugstoreActions.UpdateStoreByName(payload))
      .subscribe((resp) => {
        // this.filteredDrugstores = resp?.drugstore;
      });
  }

  private getStreetsByName = (value: string) => {
    const payload = { name: value, max_results: this.form.value.max_results };
    this.store
      .dispatch(new StreetActions.GetStreetsByName(payload))
      .subscribe((resp) => {
        // this.filteredStreets = resp?.street;
      });
  }

  selected(ev: any, storeByStreet: boolean = false): void {
    if (storeByStreet) {
      const { id, name } = ev.option.value;
      const submit = { id_neighborhood: id, flg_round_the_clock: name };
      this.store
        .dispatch(new DrugstoreActions.GetByStreetId(submit))
        .subscribe((resp) => {
          if (resp) {
            this.openModal('storeByStreetId', resp, DrugstoreDetailDialogComponent);
          }
        });
    }
  }

  openModal(formControlName: string, payload: any,
    component: ComponentType<any> | TemplateRef<any>, type?: any) {
    const dialogRef = this.appController.openDialog(payload, component);
    dialogRef.afterClosed().subscribe((dataEmitted) => {
      if (dataEmitted) {
        this.form.get(formControlName)?.setValue(dataEmitted);
        if (type) {
          if (type === 'street') {
            this.updateStreets();
          } else if (type === 'drugstore') {
            this.updateDrugstores();
          }
        }
      }
    });
  }

  public updateStreets() {
    this.store.dispatch(new StreetActions.GetUpdatedStreets())
      .subscribe((resp) => {
        // this.filteredStreets = resp?.street;
      });
  }

  public updateDrugstores() {
    this.store.dispatch(new DrugstoreActions.GetUpdatedStores())
      .subscribe((resp) => {
        // this.filteredDrugstores = resp?.drugstore;
      });
  }

  public removeDrugstoreById(payload: any): void {
    this.store.dispatch(new DrugstoreActions.RemoveDrugstoreById({ id: payload.id }))
      .subscribe((resp) => {
        if (resp) {
          this.updateDrugstores();
        }
      });
  }
}
