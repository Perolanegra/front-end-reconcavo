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

  constructor(
    public dialogRef: MatDialogRef<MaxLengthDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    // this.setComponentState();
  }

  close(data?: any) {
    this.dialogRef.close(data);
}

  // setComponentState() {
  //   const { title, message, btnYes, btnNo, type } = this.data;
  //   this.title = title || 'Atenção';
  //   this.message = message || 'Você confirma a operação a seguir?';
  //   this.btnNo = btnNo || 'Não';
  //   this.btnYes = btnYes || 'Sim';

  //   Promise.resolve(null).then(() => {
  //     this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'padding', '0px');
  //     this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'background', 'transparent');
  //     this.appController.setElementStyle(document.querySelector('.mat-icon-button'), 'color', this.appController.getColorRef(type));
  //   });
  // }

  public setErrorValidation() {
    throw new Error("Method not implemented.");
  }

  public setForm(): void {
    throw new Error("Method not implemented.");
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

  public submit(): void {
    throw new Error("Method not implemented.");
  }

}
