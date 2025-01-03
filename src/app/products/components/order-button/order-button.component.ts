import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente para un botón de ordenamiento.
 *
 * Este componente muestra un botón que, al hacer clic, emite un evento con la acción de ordenamiento ('asc' o 'desc').
 */
@Component({
  selector: 'app-order-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-button.component.html',
  styleUrl: './order-button.component.css'
})
export class OrderButtonComponent {
  /**
   * Acción de ordenamiento ('asc' o 'desc').
   */
  @Input() action!: 'asc' | 'desc';
  /**
   * Emite la acción de ordenamiento al hacer clic en el botón.
   */
  @Output() clickButton = new EventEmitter<'asc' | 'desc'>();

  /**
   * Maneja el evento de clic en el botón.
   *
   * Emite el evento `clickButton` con la acción de ordenamiento.
   */
  onClick(): void {
    this.clickButton.emit(this.action);
  }
}
