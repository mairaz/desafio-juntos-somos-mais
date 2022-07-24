import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

filters$ = new BehaviorSubject<string[]>([])
searchFilter$ = new Subject<string>()

constructor() { }

getFilters(){
  return this.filters$.asObservable()
}

setFilters(state: string[]){
  this.filters$.next(state)
}

setSearchFilter(x: string){
  this.searchFilter$.next(x)
}

getSearchFilter(){

 return this.searchFilter$.asObservable()
}

}
