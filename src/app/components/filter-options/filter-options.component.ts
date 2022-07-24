import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css']
})
export class FilterOptionsComponent implements OnInit {

  filtersAdded: string[] = []

  estados = [
        {"nome": "Acre", "sigla": "AC"},
        {"nome": "Alagoas", "sigla": "AL"},
        {"nome": "Amapá", "sigla": "AP"},
        {"nome": "Amazonas", "sigla": "AM"},
        {"nome": "Bahia", "sigla": "BA"},
        {"nome": "Ceará", "sigla": "CE"},
        {"nome": "Distrito Federal", "sigla": "DF"},
        {"nome": "Espírito Santo", "sigla": "ES"},
        {"nome": "Goiás", "sigla": "GO"},
        {"nome": "Maranhão", "sigla": "MA"},
        {"nome": "Mato Grosso", "sigla": "MT"},
        {"nome": "Mato Grosso do Sul", "sigla": "MS"},
        {"nome": "Minas Gerais", "sigla": "MG"},
        {"nome": "Pará", "sigla": "PA"},
        {"nome": "Paraíba", "sigla": "PB"},
        {"nome": "Paraná", "sigla": "PR"},
        {"nome": "Pernambuco", "sigla": "PE"},
        {"nome": "Piauí", "sigla": "PI"},
        {"nome": "Rio de Janeiro", "sigla": "RJ"},
        {"nome": "Rio Grande do Norte", "sigla": "RN"},
        {"nome": "Rio Grande do Sul", "sigla": "RS"},
        {"nome": "Rondônia", "sigla": "RO"},
        {"nome": "Roraima", "sigla": "RR"},
        {"nome": "Santa Catarina", "sigla": "SC"},
        {"nome": "São Paulo", "sigla": "SP"},
        {"nome": "Sergipe", "sigla": "SE"},
        {"nome": "Tocantins", "sigla": "TO"}
]

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  addStateToFilter(event: Event){

    const state = event.target as HTMLInputElement
    if(state.checked){
     this.filtersAdded = [...this.filtersAdded, state.value.toLocaleLowerCase()]
    }else{
     this.filtersAdded = this.filtersAdded.filter(filter => filter !== state.value.toLocaleLowerCase() )
    }
    this.filterService.setFilters(this.filtersAdded)
  }
}
