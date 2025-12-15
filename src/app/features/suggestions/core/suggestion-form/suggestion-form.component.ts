import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Suggestion} from '../../../../models/suggestion';
import {Router} from '@angular/router';
import {ListSuggestionComponent} from '../list-suggestion/list-suggestion.component';
import {SuggestionService} from '../../../../Services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})

export class SuggestionFormComponent  implements OnInit {
  suggestionService : SuggestionService =inject(SuggestionService)
   formBuilder: FormBuilder = inject(FormBuilder);
   router:Router= inject(Router);
  categories: string[] = [ 'Infrastructure et bâtiments', 'Technologie et services numériques', 'Restauration et cafétéria', 'Hygiène et environnement', 'Transport et mobilité', 'Activités et événements', 'Sécurité', 'Communication interne', 'Accessibilité', 'Autre' ];
  suggestionList : Suggestion[] | undefined =[];
  suggestionForm: FormGroup;

  constructor() {




    this.suggestionForm=this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],

      date: [{
        value: this.getCurrentDate(),
        disabled: true
      }],
      status: [{
        value: 'en attente',
        disabled: true
      }]

    })
  }

  ngOnInit(): void {

      // On s'abonne à l'Observable pour recevoir les données
      this.suggestionService.getSuggestionsList().subscribe({
        next: (data) => {
          this.suggestionList = data; // Succès : on stocke les données

        },
        error: (err) => {
          console.error('Erreur lors de la récupération', err); // Gestion d'erreur
        }
      });



    }

  private getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
isSubmitted: boolean = false;


// Getters pour accéder aux contrôles
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
  get date() { return this.suggestionForm.get('date'); }
  get status() { return this.suggestionForm.get('status'); }
  private  generateId(): number {
    return this.suggestionList?.length || 0;
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.suggestionForm.valid) {
      // Créer la nouvelle suggestion
      const newSuggestion: Suggestion = {
        id: this.generateId(),
        title: this.title?.value,
        description: this.description?.value,
        category: this.category?.value,
        date: new Date(this.date?.value),
        status: this.status?.value,
        likes: 0
      };

      // Ajouter à la liste des suggestions
    this.suggestionService.addSuggestion(newSuggestion).subscribe();

      console.log('Nouvelle suggestion ajoutée:', newSuggestion);

      // Réinitialiser le formulaire
      this.suggestionForm.reset({
        date: this.getCurrentDate(),
        status: 'en attente'
      });

      // Réinitialiser l'état
      Object.keys(this.suggestionForm.controls).forEach(key => {
        const control = this.suggestionForm.get(key);
        if (control && !control.disabled) {
          control.markAsUntouched();
          control.markAsPristine();
        }
      });

      this.isSubmitted = false;
      // Redirection vers la liste des suggestions
      this.router.navigate(['/suggestions']);
    }
  }









}
