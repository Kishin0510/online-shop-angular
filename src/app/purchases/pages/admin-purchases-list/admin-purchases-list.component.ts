import { Component, OnInit } from '@angular/core';
import { PurchaseProduct, ResponseAPIGetPurchases } from '../../../_interfaces/purchaseDTO';
import { PurchasesService } from '../../../_services/purchases.service';
import { PurchasesListComponent } from '../../components/purchases-list/purchases-list.component';
import { SearchPurchaseButtonComponent } from '../../components/search-purchase-button/search-purchase-button.component';

/**
 * Componente para la lista de compras en la vista de administración.
 *
 * Este componente muestra una lista de compras con opciones para buscar.
 */
@Component({
  selector: 'app-admin-purchases-list',
  standalone: true,
  imports: [PurchasesListComponent, SearchPurchaseButtonComponent],
  templateUrl: './admin-purchases-list.component.html',
  styleUrl: './admin-purchases-list.component.css'
})
export class AdminPurchasesListComponent implements OnInit {

  /**
   * Página actual de la lista de compras.
   */
  currentPage = 1;
  /**
   * Página anterior de la lista de compras.
   */
  lastPage = 1;
  /**
   * Término de búsqueda para filtrar la lista de compras.
   */
  searchName = '';
  /**
   * Fecha de búsqueda para filtrar la lista de compras.
   */
  searchDate =  '';
  /**
   *  Lista de compras a mostrar.
   */
  protected purchases: ResponseAPIGetPurchases[] = [];
  /**
   * Lista de productos de las compras.
   */
  protected purchaseProducts: PurchaseProduct[] = [];

  constructor(private purchasesService: PurchasesService) { }

  /**
   * Inicializa el componente y carga las compras.
   */
  ngOnInit(): void {
    this.searchQuery(this.searchName, this.searchDate);
  }

  /**
   * Maneja la búsqueda de compras.
   *
   * @param searchTerm - El término de búsqueda ingresado por el usuario.
   * @param searchDate - La fecha de búsqueda ingresada por el usuario.
   */
  searchQuery(name: string, date: string): void {
    this.searchName = name;
    this.searchDate = date;
    this.currentPage = 1;
    console.log(this.searchName, this.searchDate);
    this.purchasesService.getPurchaseQuery(this.searchName, this.searchDate).then((response) => {
      if(response.length != 0) {
        this.purchases = [];
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

  onSearchQuery(event: { term: string, date: string }) {
    this.searchQuery(event.term, event.date);
  }

}
