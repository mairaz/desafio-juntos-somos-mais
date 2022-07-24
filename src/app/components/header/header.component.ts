import { Subject } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm = new Subject<string>()

  constructor() { }

  ngOnInit() {
  }
}
