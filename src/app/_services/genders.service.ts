import { Injectable } from '@angular/core';
import { Gender } from '../_interfaces/user-auth';

@Injectable({
  providedIn: 'root'
})
export class GendersService {
  private genders: Gender[] = [];

  setGenders(genders: Gender[]){
    this.genders = genders;
  }

  getGenders(): Gender[] | null {
    return this.genders;
  }

  clearGenders() {
    this.genders = [];
  }
}
