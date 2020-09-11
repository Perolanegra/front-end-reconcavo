import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { AppDefault } from 'src/app/core/app-default';

@Component({
  selector: 'app-detail-drugstore-dialog',
  templateUrl: './detail-drugstore-dialog.component.html',
  styleUrls: ['./detail-drugstore-dialog.component.scss'],
})
export class DrugstoreDetailDialogComponent extends AppDefault implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DrugstoreDetailDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    !this.hasMobileMatches ?? this.renderer.setStyle(document.querySelectorAll('.mat-form-field-wrapper')[3] as any, 'padding-bottom', 'unset');
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

}
