import { Component, ChangeDetectorRef } from '@angular/core';
import { AppController } from './core/appController';
import { NgFormDefault } from './core/ng-form-default';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from "@angular/common"
import { MaxLengthDialogComponent } from './dialogs/maxLength/max-length-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { DrugstoreActions } from './state/drugstore/drugstore.actions';
import { Store, Select } from '@ngxs/store';
import { DrugstoreDetailComponent } from './dialogs/detail-drugstore/detail-drugstore-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends NgFormDefault {
  public filteredStreets: any;
  public filteredDrugstores: any;

  public mobileQuery: MediaQueryList;

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
    this.setForm();
    this.appController.handleAutoCompleteEntity(this.formControls.drugstore, this.formControls.drugstoreId, this.updateDrugstoreByName);
    this.appController.handleAutoCompleteEntity(this.formControls.street, this.formControls.streetId, this.updateStreetsByName);
    this.appController.handleAutoCompleteEntity(this.formControls.storeByStreet, this.formControls.storeByStreetId, this.updateStreetsByName);
    // this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'box-shadow', 'none');
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

  openModal(formControlName: string, input?: any, payload?: any) {
    const dialogRef = this.appController.openDialog(payload, MaxLengthDialogComponent);
    dialogRef.afterClosed().subscribe(dataEmitted => {
      if (dataEmitted) {
        this.form.get(formControlName)?.setValue(dataEmitted);
        input ? input.focus() : null;
        // this.ref.markForCheck();
      }
    });
  }

  tendi() {
    console.log('ok: ', this.formControls.max_results.value);
  }

  private updateDrugstoreByName = (pValue: string) => {
    this.filteredDrugstores = [
      { name: 'Farmácia São Paulo', id: 1, idNeighborhood: { id: 1, name: "Barroquinha" }, roundTheClock: false, foundationDate: '06/09/2020' },
      { name: 'Drogaria Boa Saúde', id: 2, idNeighborhood: { id: 2, name: "Av 7" }, roundTheClock: true, foundationDate: '06/09/2020' },
      { name: 'S São Paulo', id: 3, idNeighborhood: { id: 3, name: "Cabula" }, roundTheClock: false, foundationDate: '06/09/2020' },
    ];

    // this.service.obterUsuariosPorTermo(pValue).subscribe(
    //   (resp: any) => {
    //     this.filteredDrugstores = resp;
    //   }, (error: any) => {
    //     throw new Error(error);
    //   });
  }

  private updateStreetsByName = (pValue: string) => {
    this.filteredStreets = [
      { id: 6, name: "Barra" },
      { id: 6, name: "Barra" },
      { id: 6, name: "Barra" },
    ];

    // this.service.obterUsuariosPorTermo(pValue).subscribe(
    //   (resp: any) => {
    //     this.drugstore = resp;
    //   }, (error: any) => {
    //     throw new Error(error);
    //   });
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
          if (resp) this.openStoreByStreetModal('storeByStreetId', resp);
        });
    }

  }

  openStoreByStreetModal(formControlName: string, payload: any) {
    const dialogRef = this.appController.openDialog(payload, DrugstoreDetailComponent);
    dialogRef.afterClosed().subscribe(dataEmitted => {
      if (dataEmitted) {
        this.form.get(formControlName)?.setValue(dataEmitted);
        // this.ref.markForCheck();
      }
    });
  }

}
