import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppController } from 'src/app/core/appController';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgFormDefault } from 'src/app/core/ng-form-default';
import { Location } from "@angular/common";
import { StreetActions } from '../../state/street/street.actions';

@Component({
  selector: 'app-add-street-dialog',
  templateUrl: './add-street-dialog.component.html',
  styleUrls: ['./add-street-dialog.component.scss'],
})
export class AddStreetDialogComponent extends NgFormDefault implements OnInit, OnDestroy {
  public streetName: string = '';
  //   @Select(AppState.forgotPassResponse) fPassResponse$: Observable<any>;
  private fPassResponseSubscription$: Subscription = null as any;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddStreetDialogComponent>,
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
    // this.form.addControl('streetName', new FormControl(null));
    this.streetName = '';
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
      const name = this.streetName;
      this.store.dispatch(new StreetActions.AddStreetByName({ name }))
        .subscribe(resp => {
          if (resp) this.close(true);
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
