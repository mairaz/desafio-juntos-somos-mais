import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  filteredUsersByState: any[] = []

constructor(private http: HttpClient) { }

getAUsers(): Observable<any>{
 return this.http.get<any>(`http://localhost:3000/results`)
}

getUsersPagination(page = 1): Observable<any>{
  return this.http.get<any>(`http://localhost:3000/results?_page=${page}`)
 }


}
