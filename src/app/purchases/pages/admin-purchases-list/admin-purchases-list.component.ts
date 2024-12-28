import { Component, OnInit } from '@angular/core';
import { PurchaseProduct, ResponseAPIGetPurchases } from '../../../_interfaces/purchaseDTO';
import { PurchasesService } from '../../../_services/purchases.service';
import { PurchasesListComponent } from '../../components/purchases-list/purchases-list.component';

@Component({
  selector: 'app-admin-purchases-list',
  standalone: true,
  imports: [PurchasesListComponent],
  templateUrl: './admin-purchases-list.component.html',
  styleUrl: './admin-purchases-list.component.css'
})
export class AdminPurchasesListComponent implements OnInit {

  currentPage = 1;
  lastPage = 1;
  searchName = '';
  searchDate =  '';
  protected purchases: ResponseAPIGetPurchases[] = [];
  protected purchaseProducts: PurchaseProduct[] = [];

  constructor(private purchasesService: PurchasesService) { }

  ngOnInit(): void {
    this.getPurchases();
  }
  getPurchases(): void {
    this.purchasesService.getAllPurchases(this.currentPage, 50).then((response) => {
      if(response.length != 0) {
        for (let i = 0; i < response.length; i++) {
          this.purchases.push(response[i]);
          for (let j = 0; j < response[i].purchaseProducts.length; j++) {
            this.purchaseProducts.push(response[i].purchaseProducts[j]);
          }
        }
        console.log(this.purchases);
      } else {
        this.lastPage = this.currentPage - 1;
        this.currentPage = this.lastPage;
      }
    }).catch((error) => {
      console.error("Error obteniendo productos", error);
    });
  }

  searchQuery(name: string, date: string): void {
    this.searchName = name;
    this.searchDate = date;
    this.currentPage = 1;
    this.purchasesService.getPurchaseQuery(this.searchName, this.searchDate).then((response) => {
      if(response.length != 0) {
        for (let i = 0; i < response.length; i++) {
          this.purchases.push(response[i]);
        }
        console.log(this.purchases);
      } else {
        this.lastPage = this.currentPage - 1;
        this.currentPage = this.lastPage;
      }
    }).catch((error) => {
      console.error("Error obteniendo productos", error);
    });
  }
  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getPurchases();
  }
}
