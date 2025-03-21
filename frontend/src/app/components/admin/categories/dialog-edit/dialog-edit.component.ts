import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/admin/category.service';
import { Category } from '../../../../models/category';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog-edit',
  imports: [ReactiveFormsModule, MatButton],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss'
})
export class DialogEditComponent implements OnInit {



  categoryForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogEditComponent>,
              private categoryService: CategoryService){
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: [this.data.name, [Validators.required]]
    });
  }

  editCategory() {
    if(this.categoryForm.invalid) return;
    
    const category: Category = {
      name: this.categoryForm.get('category')?.value
    };

    if(this.data.create){
      this.categoryService.createCategory(category).subscribe({
        next: (response) => {
          this.dialogRef.close({created: true})
        },
        error: (err) => {console.log(err);
          this.onCancel();
        }
      });
    }
    else{
      this.categoryService.updateCategory(this.data.id, category).subscribe({
        next: (response) => {
          this.dialogRef.close({edited: true});
        },
        error: (err) => {console.log(err);
          this.onCancel();
        }
      });
    }
    
  }

  onCancel() {
    this.dialogRef.close();
  }

}
