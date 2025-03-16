import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/admin/category.service';

@Component({
  selector: 'app-dialog-delete',
  imports: [],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogDeleteComponent>,
              private categoryService: CategoryService){

  }


  onDeleteCategory() {
    this.categoryService.deleteCategory(this.data.id).subscribe({
      next: response => {
        this.dialogRef.close({deleted: true});
      },
      error: (err) => {
        console.log(err);
        this.dialogRef.close();
      }
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

}
