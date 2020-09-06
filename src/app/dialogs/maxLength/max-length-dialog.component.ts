import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'app-max-legth-dialog',
  templateUrl: './max-length-dialog.component.html',
  styleUrls: ['./max-length-dialog.component.scss'],
})
export class MaxLengthDialogComponent implements OnInit {

  public maxLength: number = 0;
  public anotherContent: boolean = false;
  public flg_round_the_clock: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MaxLengthDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.anotherContent = this.data?.storeByStreet;
  }

  close(data?: any) {
    this.dialogRef.close(data);
}

}
