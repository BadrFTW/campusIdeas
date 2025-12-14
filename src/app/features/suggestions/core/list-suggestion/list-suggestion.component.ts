import { Component } from '@angular/core';
import {Suggestion} from '../../../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
  searchTerm: string = '';
  favourites : Suggestion[] = []

  public static suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      likes:0
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      likes:0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      likes:0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      likes:0
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Organisation d\'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      likes:0
    }
    ];


  public static addSuggestion(suggestion: Suggestion) {
    // Ajouter au tableau sans récursion
    this.suggestions.push(suggestion);
  }




  filteredSuggestions: Suggestion[] = [...ListSuggestionComponent.suggestions];



  addLike(id:number): void {
    let suggestion: Suggestion | undefined  ;
     suggestion = ListSuggestionComponent.suggestions.find(sugg => sugg.id === id )
      if(suggestion) {
        suggestion.likes = suggestion.likes + 1;
      }
      else {
        console.warn(`Suggestion with id ${id} not found`);
      }

  }



  filterItems(): void {
    if (!this.searchTerm) {
      this.filteredSuggestions = [...ListSuggestionComponent.suggestions];
      return;
    }

    const term = this.searchTerm.toLowerCase();

    this.filteredSuggestions = ListSuggestionComponent.suggestions.filter((suggestion) =>
      suggestion.title.toLowerCase().includes(term) ||
      suggestion.description.toLowerCase().includes(term) ||
      suggestion.category.toLowerCase().includes(term)
    );


}
  addToFavourite  = (id:number)=>{

    let suggestion: Suggestion | undefined  ;
    suggestion = ListSuggestionComponent.suggestions.find(sugg => sugg.id === id )
    if(suggestion) {
     this.favourites.push(suggestion);
    alert("added")
    }
    else {
      console.warn(`Suggestion with id ${id} not found`);
    }


  }

}
