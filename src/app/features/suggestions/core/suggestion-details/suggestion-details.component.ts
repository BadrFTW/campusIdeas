import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Suggestion} from '../../../../models/suggestion';
import {SuggestionService} from '../../../../Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  //DI
  suggestionService : SuggestionService =inject(SuggestionService)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  suggestion : Suggestion | undefined
  suggestionId! : number;
  constructor() {}

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
      this.suggestionId = +params['id']; });

      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
      next: (data) => {
        this.suggestion = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération', err);
      }
    });






  }


  handleDeleteSuggestion (id:number) : void   {
    this.suggestionService.deleteSuggestion(id).subscribe()
    this.router.navigate(['suggestions'])

  }




}
