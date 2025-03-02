import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css'
})
export class DialogEditComponent {


  constructor(private dialogRef: MatDialogRef<DialogEditComponent>){}

  closeDialog() {
        
    this.dialogRef.close();
  }

}
