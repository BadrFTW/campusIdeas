import {Component, inject} from '@angular/core';
import {Suggestion} from '../../../../models/suggestion';
import {SuggestionService} from '../../../../Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
  //DI
  suggestionsService : SuggestionService = inject(SuggestionService)
  searchTerm: string = '';
  favourites : Suggestion[] = []
  suggestionsList: Suggestion[] | undefined
  filteredSuggestions: Suggestion[] | undefined =[]

  //On Init function
  ngOnInit(): void {
    // On s'abonne à l'Observable pour recevoir les données
    this.suggestionsService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestionsList = data; // Succès : on stocke les données
        this.filteredSuggestions = [...(this.suggestionsList ?? [])];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération', err); // Gestion d'erreur
      }
    });
  }


  // add like function
  addLike(id:number): void {
    let suggestion: Suggestion | undefined  ;
     suggestion = this.suggestionsList?.find(sugg => sugg.id === id )
      if(suggestion) {
        suggestion.likes = suggestion.likes + 1;
      }
      else {
        console.warn(`Suggestion with id ${id} not found`);
      }

  }
  // filter suggestion from search function
  filterItems(): void {
    if (!this.searchTerm) {
      this.filteredSuggestions = [...(this.suggestionsList ?? [])];
      return;
    }

    const term = this.searchTerm.toLowerCase();

    this.filteredSuggestions = this.suggestionsList?.filter((suggestion) =>
      suggestion.title.toLowerCase().includes(term) ||
      suggestion.description.toLowerCase().includes(term) ||
      suggestion.category.toLowerCase().includes(term)
    ) ;


}
  // add to favourite function
  addToFavourite  = (id:number)=>{
    let suggestion: Suggestion | undefined  ;
    suggestion = this.suggestionsList?.find(sugg => sugg.id === id )
    if(suggestion) {
     this.favourites.push(suggestion);
    alert("added")
    }
    else {
      console.warn(`Suggestion with id ${id} not found`);
    }
  }




}
