import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../_services/product.service';
import { Product, productType } from '../../../_interfaces/productDTO';
import { ToastService } from '../../../_services/toast.service';


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
  private productService = inject(ProductService);
  private toastService = inject(ToastService);
  product!: Product;
  selectedImage: boolean = false;
  productTypes: productType[] = [];
  productTypesNames: string[] = [];

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
      this.productService.getProductTypes().then((response) => {
        this.productTypes = response;
        this.productTypesNames = this.productTypes.map((type) => type.type);
        console.log('Tipos de producto:', this.productTypesNames);
      })
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
      image: [null],
      productType: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const formData = new FormData();
      const formValues = this.forms.value;
      if (this.product.name !== formValues.name) {
        formData.append('Name', this.forms.get('name')?.value);
      }
      formData.append('Price', this.forms.get('price')?.value);
      formData.append('Stock', this.forms.get('stock')?.value);

      if (this.selectedImage) {
        console.log('Imagen seleccionada');
        formData.append('Image', this.forms.get('image')?.value);
      }
      if (this.product.productType !== formValues.productType) {
        const selectedProductTypeId = this.productTypes.find((type) => type.type === formValues.productType)?.id || 1;
        formData.append('ProductTypeId', selectedProductTypeId.toString());
      }
      const response = await this.productService.editProduct(this.product.id, formData);
      console.log('Response:', response);

      if(response) {
        this.error = false;
        this.errorMessage = [];
        this.toastService.succes('Producto editado con éxito');
        this.router.navigate(['/admin/products']);
      }
      else {
        this.error = true;
        this.errorMessage = this.productService.getErrors();
        this.toastService.error('Error al editar el producto');
        console.log('Error al editar el producto:', this.errorMessage);
      }
    } catch (error: any) {
      console.error('Error al editar el producto:', error);
      this.toastService.error('Error al editar el producto');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = true;
      this.forms.patchValue({
        image: file
      });
    }
  }
}
