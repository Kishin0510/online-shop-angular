import { Injectable, signal } from '@angular/core';
import { Toast } from '../_interfaces/toast';

/**
 * Servicio para mostrar mensajes de notificación en la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /**
   * Atributo para almacenar los mensajes de notificación.
   */
  private toast = signal<Toast[]>([]);

  /**
   * Obtiene los mensajes de notificación.
   * @returns Un observable con los mensajes de notificación.
   */
  getToast() {
    return this.toast;
  }

  /**
   * Muestra un mensaje de notificación.
   * @param message - El mensaje a mostrar.
   * @param type - El tipo de mensaje.
   * @param duration - La duración del mensaje.
   */
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

  /**
   * Muestra un mensaje de éxito.
   * @param message - El mensaje a mostrar.
   * @param duration - La duración del mensaje en milisegundos.
   */
  succes(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  /**
   * Muestra un mensaje de error.
   * @param message - El mensaje a mostrar.
   * @param duration - La duración del mensaje en milisegundos.
   */
  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  /**
   * Muestra un mensaje de advertencia.
   * @param message - El mensaje a mostrar.
   * @param duration - La duración del mensaje en milisegundos.
   */
  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  /**
   * Muestra un mensaje de información.
   * @param message - El mensaje a mostrar.
   * @param duration - La duración del mensaje en milisegundos.
   */
  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  /**
   * Elimina un mensaje de notificación.
   * @param id - El ID del mensaje a eliminar.
   */
  private remove(id: string) {
    this.toast.update((currentToast) => currentToast.filter((toast) => toast.id !== id));
  }
}


