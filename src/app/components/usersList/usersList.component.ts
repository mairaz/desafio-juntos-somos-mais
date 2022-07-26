import { debounceTime, distinctUntilChanged, map, Observable, mergeMap } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  nameFilter: any = []

  constructor(
    private userService: UsersService,
    private filterService: FilterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.filterService.getFilters().subscribe((res) => {
      this.filterByState(res)
      this.stateFilters = res
    })
    this.getNameForSearchUser()
    this.getUsers()
  }



  getUsers(page: number = 1) {
    this.userService.getAUsers(page).
      subscribe(res => {
        this.users = res.results
        this.totalUsers = res.totalResults
      })
  }



  filterByState(states: string[], page: number = 1): any {

    if(!!this.nameFilter.length && !states.length){
      this.userService.filterByName(this.nameFilter, page).subscribe( res => {
        this.users = res.results
        this.totalUsers = res.totalResults
        this.filteredUsers = res.results
      })
      return
    }

    if(!!this.nameFilter.length && !!states.length){
      this.users = states.flatMap(state => this.filteredUsers.filter(user=> (state.includes(user.location.state))))
      this.totalUsers = this.users.length
      return
    }

    if (!!states.length) {
      this.userService.filterByState(states, page).subscribe(ress => {
        this.users = ress.results
        this.totalUsers = ress.totalResults
        this.filteredUsers = ress.results
      })
      return
    }

    this.getUsers()

  }

  getNameForSearchUser() {
    this.filterService.getSearchFilter().pipe(
      debounceTime(800),
      distinctUntilChanged()).
      subscribe(res => {
        this.filterByName(res)
        this.nameFilter = res
      })
  }

  filterByName(typedName: string, page = 1) {
    if(!!this.stateFilters.length && !typedName.length){
      this.userService.filterByState(this.stateFilters, page).subscribe(res => {
        this.users = res.results
        this.totalUsers = res.totalResults
        this.filteredUsers = res.results
        console.log(1)
      })
      return
    }

    if (!!this.stateFilters.length) {
      this.users = this.users.filter(({name})=> name.last.includes(typedName))
      this.totalUsers = this.users.length
      console.log(2)
      return
    }

    if (!!typedName.length) {
      this.userService.filterByName(typedName, page).subscribe(res => {
        this.users = res.results
        this.totalUsers = res.totalResults
        this.filteredUsers = res.results
        console.log(3)
      })
      return
    }


    this.getUsers()



  }

  goToPage(page: number) {
    if (!!this.nameFilter.length) {
      this.filterByName(this.nameFilter, page)
      return
    }
    if (!!this.stateFilters.length) {
      this.filterByState(this.stateFilters, page)
      return
    }
    this.getUsers(page)
  }

}
