import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-usersList',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css']
})
export class UsersListComponent implements OnInit {

  filteredUsers: any[] = [];
  totalUsers!: number;
  allUsers: any[] = []
  users: any[] = [];
  page = 10;
  stateFilters: any = []

  constructor(
    private userService: UsersService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.usersCount()
    this.filterService.getFilters().subscribe((res) => {
      this.filterByState(res)
      this.stateFilters = res
    })
    this.getNameForSearchUser()
    this.getUsers()
  }

  usersCount() {
    this.userService.getAUsers().subscribe((users) => {
      this.totalUsers = users.length
      this.allUsers = users

    })
  }

  getUsers() {
    this.userService.getUsersPagination().
      subscribe(res => this.users = res)
  }



  filterByState(state: string[]): any {
    if (!state.length) {
      this.getUsers()
      this.usersCount()
      return
    }
    this.filteredUsers = this.allUsers.
      filter(user => state.includes(user.location.state));
    this.totalUsers = this.filteredUsers.length
    this.users = this.filteredUsers.slice(0, this.page)
  }

  getNameForSearchUser() {
    this.filterService.getSearchFilter().pipe(
      debounceTime(800),
      distinctUntilChanged()).
      subscribe(res => this.filterByName(res))
  }

  filterByName(typedName: string) {
    const foundUser = this.allUsers.filter(({ name }) => {
      return `${name.first.toLowerCase()}`.includes(typedName.toLowerCase()) || `${name.last.toLowerCase()}`.includes(typedName.toLowerCase())
    })
    this.users = foundUser.slice(0, this.page);
    this.totalUsers = foundUser.length

  }

  goToPage(e: number) {
    if (!this.stateFilters.length) {
      this.userService.getUsersPagination(e).
        subscribe(res => this.users = res)
        return
    }
    this.users = this.filteredUsers.slice(e*this.page - this.page, e*this.page)
  }

}
