import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  private toastService = inject(ToastService);
  toasts = this.toastService.getToast();

  getToastClasses(type: string) {
    const baseClasses = 'animate-fade-in';
    switch (type) {
      case 'success':
        return `${baseClasses} border-green-500`;
      case 'error':
        return `${baseClasses} border-red-500`;
      case 'warning':
        return `${baseClasses} border-yellow-500`;
      case 'info':
        return `${baseClasses} border-blue-500`;
      default:
        return baseClasses;
    }
  }

  getIconBackgroundClass(type: string): string {
    switch (type) {
      case 'success':
        return 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200';
      default:
        return '';
    }
  }

  getIconClass(type: string): string {
    const baseClass = 'w-5 h-5';
    switch (type) {
      case 'success':
        return `${baseClass} fas fa-check`;
      case 'error':
        return `${baseClass} fas fa-times`;
      case 'warning':
        return `${baseClass} fas fa-exclamation`;
      case 'info':
        return `${baseClass} fas fa-info`;
      default:
        return baseClass;
    }
  }
}
