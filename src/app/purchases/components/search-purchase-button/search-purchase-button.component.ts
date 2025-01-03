import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Componente para mostrar una lista de compras.
 *
 * Este componente muestra una tabla con la lista de compras realizadas por los usuarios.
 */
@Component({
  selector: 'app-search-purchase-button',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-purchase-button.component.html',
  styleUrl: './search-purchase-button.component.css'
})
export class SearchPurchaseButtonComponent {
  /**
   * Término de búsqueda para filtrar la lista de compras.
   */
  searchTerm: string = '';
  /**
   * Fecha de búsqueda para filtrar la lista de compras.
   */
  searchDate: string = '';
  /**
   * Evento que emite el término de búsqueda y la fecha de búsqueda.
   */
  @Output() searchQuery = new EventEmitter<{ term: string, date: string }>();

  /**
   * Emite el evento `searchQuery` con el término de búsqueda y la fecha formateada.
   */
  emitSearchQuery() {
    const formattedDate = this.formatDate(this.searchDate);
    this.searchQuery.emit({ term: this.searchTerm, date: formattedDate });
  }

    /**
   * Formatea la fecha de búsqueda.
   *
   * @param date - La fecha.
   * @returns La fecha formateada en formato 'DD-MM-YYYY'.
   */
  formatDate(date: string): string {
    if (!date) {
      return '';
    }
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
}
