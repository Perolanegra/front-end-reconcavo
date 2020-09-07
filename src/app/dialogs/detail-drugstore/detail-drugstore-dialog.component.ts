import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';


@Component({
  selector: 'app-detail-drugstore-dialog',
  templateUrl: './detail-drugstore-dialog.component.html',
  styleUrls: ['./detail-drugstore-dialog.component.scss'],
})
export class DrugstoreDetailComponent implements OnInit {

  public name: any = 'teste';
  public foundationDate: any = 'teste';
  public flg_round_the_clock: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DrugstoreDetailComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

}
