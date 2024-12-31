import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-purchase-button',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-purchase-button.component.html',
  styleUrl: './search-purchase-button.component.css'
})
export class SearchPurchaseButtonComponent {
  searchTerm: string = '';
  searchDate: string = '';
  @Output() searchQuery = new EventEmitter<{ term: string, date: string }>();

  emitSearchQuery() {
    const formattedDate = this.formatDate(this.searchDate);
    this.searchQuery.emit({ term: this.searchTerm, date: formattedDate });
  }

  formatDate(date: string): string {
    if (!date) {
      return '';
    }
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
}
