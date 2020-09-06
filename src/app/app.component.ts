import { Component, ChangeDetectorRef } from '@angular/core';
import { AppController } from './core/appController';
import { NgFormDefault } from './core/ng-form-default';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from "@angular/common"
import { MaxLengthDialogComponent } from './dialogs/maxLength/max-length-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';

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

    // this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'box-shadow', 'none');
  }


  setForm(): void {
    this.form.addControl('street', new FormControl(null));
    this.form.addControl('streetId', new FormControl(null));
    this.form.addControl('drugstore', new FormControl(null));
    this.form.addControl('drugstoreId', new FormControl(null));
    this.form.addControl('max_results', new FormControl(null));
  }

  openModal(formControlName: string, input: any) {
    const dialogRef = this.appController.openDialog(null, MaxLengthDialogComponent);
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
      { name: 'Farmácia São Paulo', id: 1 },
      { name: 'Farmácia São Paulo', id: 2 },
      { name: 'Farmácia São Paulo', id: 3 },
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
      { name: 'Farmácia São Paulo', id: 1 },
      { name: 'Farmácia São Paulo', id: 2 },
      { name: 'Farmácia São Paulo', id: 3 },
    ];

    // this.service.obterUsuariosPorTermo(pValue).subscribe(
    //   (resp: any) => {
    //     this.drugstore = resp;
    //   }, (error: any) => {
    //     throw new Error(error);
    //   });
  }

  selected(event: any): void {
    // this.appController.openDialog();
    console.log('valor selecionado: ', event.option.value);
    
    // this.chipsDestinatarios.push(event.option.value);
    this.formControls.optionPara.setValue(null);
  }

}
