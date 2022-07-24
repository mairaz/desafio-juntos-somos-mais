import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface MyPagination {
  itemsCount: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})


export class PaginationComponent implements OnInit {

  public pagesArray: Array<number> = [];
  public currentPage: number = 1;

  @Input() set setPagination(pagination: MyPagination) {
    if (pagination) {
      const pagesAmount = Math.ceil(
        pagination.itemsCount / pagination.pageSize
      );
      this.pagesArray = new Array(pagesAmount).fill(1);
        console.log(pagination.itemsCount)
    }
  }

  @Output() goToPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {


  }

  public setPage(pageNumber: number): void {
    // Prevent changes if the same page was selected
    if (pageNumber === this.currentPage)
      return;
    this.currentPage = pageNumber;
    this.goToPage.emit(pageNumber);
  }

}
