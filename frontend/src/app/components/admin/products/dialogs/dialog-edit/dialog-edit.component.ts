import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css'
})
export class DialogEditComponent {


  private deleteSuccess: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogEditComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private router: Router
  ){}

  closeDialog() {
    this.dialogRef.close({success: this.deleteSuccess});
  }

  onDelete() {
    const dialogRef= this.dialog.open(DialogDeleteComponent,{
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: this.data
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        this.deleteSuccess = result.success
      }
    });

  }

  onEdit() {
    this.router.navigate(['/admin/edit-product'], {queryParams: {productId: this.data.id}})
    this.dialogRef.close({success: this.deleteSuccess})
  }

}
