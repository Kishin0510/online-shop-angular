import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_interfaces/productDTO';

@Component({
  selector: 'app-edit-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.css'
})
export class EditProductFormComponent implements OnInit {
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  productService = inject(ProductService);
  product!: Product;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id'];
    this.createForm();
    if (productId) {
      this.productService.getProductById(productId).then((response) => {
        this.product = response;
        console.log('Producto:', this.product);
        this.forms.patchValue(this.product);
       });
    } else {
      this.error = true;
      this.errorMessage = ['No se ha seleccionado un producto para editar'];
    }
  }

  async createForm() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      //image: [null, Validators],
      //productTypeId: [this.product.productType, Validators],
    });
  }

  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const formData = new FormData();
      if (this.product.name !== this.forms.get('name')?.value) {
        formData.append('Name', this.forms.get('name')?.value);
      }
      formData.append('Price', this.forms.get('price')?.value);
      formData.append('Stock', this.forms.get('stock')?.value);
      //formData.append('Image', this.forms.get('image')?.value);
      //formData.append('ProductTypeId', this.forms.get('productTypeId')?.value);

      const response = await this.productService.editProduct(this.product.id, formData);
      console.log('Response:', response);

      if(response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Producto editado con éxito', response);
        this.router.navigate(['/admin/products']);
      }
      else {
        this.error = true;
        this.errorMessage = this.productService.getErrors();
        console.log('Error al editar el producto:', this.errorMessage);
      }
    } catch (error: any) {
      console.error('Error al editar el producto:', error);
    }
  }

  onFileChange(event: any) {
    const file = event.tarjet.files[0];
    if (file) {
      this.forms.patchValue({
        image: file
      });
    }
  }
}
