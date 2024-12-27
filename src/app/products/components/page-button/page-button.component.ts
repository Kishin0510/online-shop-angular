import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-button',
  standalone: true,
  imports: [],
  templateUrl: './page-button.component.html',
  styleUrl: './page-button.component.css'
})
export class PageButtonComponent {
  @Input() action!: 'next' | 'prev';
  @Output() clickButton = new EventEmitter<'next' | 'prev'>();

  onClick(): void {
    this.clickButton.emit(this.action);
  }

}
