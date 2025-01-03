import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Componente para un botón de búsqueda.
 *
 * Este componente muestra un campo de entrada y un botón para realizar una búsqueda.
 * Al hacer clic en el botón, se emite un evento con el término de búsqueda.
 */
@Component({
  selector: 'app-search-button',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.css'
})
export class SearchButtonComponent {
  /**
   * La query de búsqueda.
   */
  searchTerm: string = '';

  /**
   * Emite la query de búsqueda.
   */
  @Output() query = new EventEmitter<string>();

  /**
   * Maneja el evento de clic en el botón de búsqueda.
   *
   * Emite el evento `query` con el término de búsqueda.
   */
  searchQuery(): void {
    this.query.emit(this.searchTerm);
  }
}
