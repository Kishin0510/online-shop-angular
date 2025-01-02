import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../_services/product.service';
import { productType } from '../../../_interfaces/productDTO';
import { Router } from '@angular/router';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  private productService = inject(ProductService);
  private ToastService = inject(ToastService);
  productTypes: productType[] = [];
  productTypesNames: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.getProductTypes();
  }

  createForm() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      image: [null, Validators.required],
      productType: ['', Validators.required],
    });
  }

  getProductTypes() {
    this.productService.getProductTypes().then((response) => {
      this.productTypes = response;
      this.productTypesNames = this.productTypes.map((type) => type.type);
      console.log('Tipos de producto:', this.productTypes);
    });
  }

  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const formData = new FormData();
      formData.append('Name', this.forms.get('name')?.value);
      formData.append('Price', this.forms.get('price')?.value);
      formData.append('Stock', this.forms.get('stock')?.value);
      formData.append('Image', this.forms.get('image')?.value);

      const productTypeId = this.productTypes.find((type) => type.type === this.forms.get('productType')?.value)?.id || 1;
      formData.append('ProductTypeId', productTypeId?.toString());

      const response = await this.productService.createProduct(formData);
      console.log('Response:', response);

      if(response) {
        this.error = false;
        this.errorMessage = [];
        this.ToastService.succes('Producto creado con éxito');
        this.router.navigate(['/products']);
      }
      else {
        this.error = true;
        this.errorMessage = this.productService.getErrors();
        this.ToastService.error('Error al crear el producto');
        console.log('Error al crear el producto:', this.errorMessage);
      }

    } catch (error: any) {
      this.error = true;
      this.errorMessage = error;
      this.ToastService.error('Error al crear el producto');
      console.log('Error al crear el producto:', error);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.forms.patchValue({
        image: file
      });
    }
  }

  get nameInvalid() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get priceInvalid() {
    return this.forms.get('price')?.invalid && this.forms.get('price')?.touched;
  }

  get stockInvalid() {
    return this.forms.get('stock')?.invalid && this.forms.get('stock')?.touched;
  }

  get imageInvalid() {
    return this.forms.get('image')?.invalid && this.forms.get('image')?.touched;
  }

  get productTypeIdInvalid() {
    return this.forms.get('productTypeId')?.invalid && this.forms.get('productTypeId')?.touched;
  }
}
