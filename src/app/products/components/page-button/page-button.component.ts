import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Maneja el evento de clic en el botón.
 *
 * Emite el evento `clickButton` con la acción de ordenamiento.
 */
@Component({
  selector: 'app-page-button',
  standalone: true,
  imports: [],
  templateUrl: './page-button.component.html',
  styleUrl: './page-button.component.css'
})
export class PageButtonComponent {
  /**
   * Acción de paginación ('next' para siguiente página, 'prev' para página anterior).
   */
  @Input() action!: 'next' | 'prev';

  /**
   * Emite la acción de paginación al hacer clic en el botón.
   */
  @Output() clickButton = new EventEmitter<'next' | 'prev'>();

  /**
   * Maneja el evento de clic en el botón.
   *
   * Emite el evento `clickButton` con la acción de paginación.
   */
  onClick(): void {
    this.clickButton.emit(this.action);
  }

}
