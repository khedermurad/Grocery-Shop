import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../../../services/admin/product.service';

@Component({
  selector: 'app-dialog-delete',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
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
