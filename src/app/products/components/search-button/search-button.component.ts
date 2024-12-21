import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-button',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.css'
})
export class SearchButtonComponent {
  searchTerm: string = '';
  @Output() query = new EventEmitter<string>();

  searchQuery(): void {
    this.query.emit(this.searchTerm);
  }
}
