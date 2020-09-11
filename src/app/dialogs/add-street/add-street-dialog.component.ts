import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppController } from 'src/app/core/appController';
import { Location } from "@angular/common";
import { StreetActions } from '../../state/street/street.actions';

@Component({
  selector: 'app-add-street-dialog',
  templateUrl: './add-street-dialog.component.html',
  styleUrls: ['./add-street-dialog.component.scss'],
})
export class AddStreetDialogComponent implements OnInit, OnDestroy {
  public street: any = {
    name: '',
    id: null
  };

  private addSubscription$: Subscription = null as any;

  constructor(
    public dialogRef: MatDialogRef<AddStreetDialogComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    private store: Store,
    protected location: Location,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.setComponentState();
  }

  ngOnDestroy() {
    if (this.addSubscription$) this.addSubscription$.unsubscribe();
  }

  submit(): void {
    if (this.street.name) {
      const name = this.street.name;
      this.addSubscription$ = this.store
        .dispatch(this.data?.id ?
          new StreetActions.EditStreet(this.street) :
          new StreetActions.AddStreet({ name }))
        .subscribe(resp => {
          if (resp) this.close(true);
        }, (error => {
          this.appController.tratarErro(error);
        }));
    }
  }

  public setComponentState() {
    this.street = Object.assign({}, this.data);
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

}
