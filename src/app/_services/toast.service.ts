import { Injectable, signal } from '@angular/core';
import { Toast } from '../_interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = signal<Toast[]>([]);

  getToast() {
    return this.toast;
  }

  show(message: string, type: Toast['type'], duration: number = 3000) {
    const id = crypto.randomUUID();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    this.toast.update((currentToast) => [...currentToast, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  succes(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  private remove(id: string) {
    this.toast.update((currentToast) => currentToast.filter((toast) => toast.id !== id));
  }
}


