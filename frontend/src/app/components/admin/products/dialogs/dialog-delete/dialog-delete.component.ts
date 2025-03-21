import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../../../services/admin/product.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete',
  imports: [MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {


  constructor(private dialogRef: MatDialogRef<DialogDeleteComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService
  ){}

  closeDialog() {
    this.dialogRef.close();
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.data.id).subscribe(
      {
        next: (response) => this.dialogRef.close({success: true}),
        error: (err) => console.log(err)
      }
    );
  }
  

}
