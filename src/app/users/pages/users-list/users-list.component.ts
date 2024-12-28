import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../_services/user.service';
import { Result } from '../../../_interfaces/usersDTO';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { SearchButtonComponent } from '../../../products/components/search-button/search-button.component';
import { PageButtonComponent } from '../../../products/components/page-button/page-button.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserListComponent, SearchButtonComponent, PageButtonComponent],
  providers: [UserService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  usersArray: Result[] = [];

  searchName: string = '';

  currentPage: number = 1;
  lastPage: number = 1;

  private userService = inject(UserService);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers(this.searchName, this.currentPage, 50).then((response) => {
      if(response.result.length != 0) {
        this.usersArray = response.result;
        console.log(this.usersArray);
      } else {
        this.lastPage = this.currentPage - 1;
        this.currentPage = this.lastPage;
      }
    }).catch((error) => {
      console.error("Error obteniendo usuarios", error);
    });
  }

  searchQuery(query: string): void {
    this.searchName = query;
    this.currentPage = 1;
    this.getUsers();
  }

  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getUsers();
  }
}
