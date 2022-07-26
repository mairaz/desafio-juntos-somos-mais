import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, Observable, mergeMap, from, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  filteredUsersByState: any[] = []

  constructor(private http: HttpClient) { }

  getAUsers(page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/results?page=${page}`)
  }

  getUsersPagination(page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/results`)
  }

  filterByName(name: string, page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/results?name=${name}&page=${page}`)
  }

  filterByState(state: string[], page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/results?state=${state}&page=${page}`)

  }


}
