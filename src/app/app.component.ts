import { Component, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { AppController } from './core/appController';
import { NgFormDefault } from './core/ng-form-default';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from "@angular/common"
import { MaxLengthDialogComponent } from './dialogs/maxLength/max-length-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { DrugstoreActions } from './state/drugstore/drugstore.actions';
import { Store, Select } from '@ngxs/store';
import { DrugstoreDetailDialogComponent } from './dialogs/detail-drugstore/detail-drugstore-dialog.component';
import { AppActions } from './state/app/app.actions';
import { AddStreetDialogComponent } from './dialogs/add-street/add-street-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { StreetActions } from './state/street/street.actions';
import { AddStoreDialogComponent } from './dialogs/add-drugstore/add-store-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends NgFormDefault {
  public filteredStreets: any;
  public filteredDrugstores: any;

  public mobileQuery: MediaQueryList;
  public maxLengthDialogComponent = MaxLengthDialogComponent;
  public addStreetDialogComponent = AddStreetDialogComponent;
  public addStoreDialogComponent = AddStoreDialogComponent;

  constructor(protected appController: AppController,
    protected formBuilder: FormBuilder,
    private store: Store,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    protected location: Location) {
    super(formBuilder, appController, location);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.store.dispatch(new AppActions.SetMediaScreen(this.mobileQuery.matches));
    this.setForm();
    this.appController.handleAutoCompleteEntity(this.formControls.drugstore, this.formControls.drugstoreId, this.updateDrugstoreByName);
    this.appController.handleAutoCompleteEntity(this.formControls.street, this.formControls.streetId, this.updateStreetsByName);
    this.appController.handleAutoCompleteEntity(this.formControls.storeByStreet, this.formControls.storeByStreetId, this.updateStreetsByName);
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

  tendi() {
    console.log('ok: ', this.formControls.max_results.value);
  }

  private updateDrugstoreByName = (value: string) => {
    this.store.dispatch(new DrugstoreActions.UpdateStoreByName({ name: value }))
      .subscribe(resp => {
        this.filteredDrugstores = resp?.drugstore;
      });
  }

  private updateStreetsByName = (value: string) => {
    this.store.dispatch(new StreetActions.UpdateStreetsByName({ name: value }))
      .subscribe(resp => {
        this.filteredStreets = resp?.street;
      });
  }

  private updateStoreByStreetId = (pValue: string) => {
    this.filteredDrugstores = [
      { name: 'FOdasse mudei', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
    ];
  }

  selected(ev: any, storeByStreet: boolean = false): void {
    console.log('valor selecionado: ', ev.option.value);
    if (storeByStreet) {
      const { id, name } = ev.option.value;
      const submit = { id_neighborhood: id, flg_round_the_clock: name };
      this.store.dispatch(new DrugstoreActions.GetByStreetId(submit))
        .subscribe(resp => {
          if (resp) this.openModal('storeByStreetId', resp, DrugstoreDetailDialogComponent);
        });
    }

  }

  openModal(formControlName: string, payload: any, component: ComponentType<any> | TemplateRef<any>, type?: any) {
    const dialogRef = this.appController.openDialog(payload, component);
    dialogRef.afterClosed().subscribe(dataEmitted => {
      if (dataEmitted) {
        console.log('entrei pq sou true');
        this.form.get(formControlName)?.setValue(dataEmitted);
        if (type) {
          if (type === 'street') this.updateStreets();
          else if (type === 'drugstore') this.updateDrugstores();
        }
      }
    });
  }

  public updateStreets() {
    this.store.dispatch(new StreetActions.GetUpdatedStreets())
      .subscribe(resp => {
        this.filteredStreets = resp?.street;
      });
  }

  public updateDrugstores() {
    this.store.dispatch(new DrugstoreActions.GetUpdatedStores())
      .subscribe(resp => {
        this.filteredDrugstores = resp?.drugstore;
      });
  }


}
