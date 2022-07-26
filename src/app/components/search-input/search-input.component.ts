import { FilterService } from 'src/app/services/filter.service';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {


  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
  }

  onInput(ev: any){
    this.filterService.setSearchFilter(ev.target.value.trim())
  }
}
