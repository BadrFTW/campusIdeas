import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Suggestion} from '../../../../models/suggestion';
import {Router} from '@angular/router';
import {ListSuggestionComponent} from '../list-suggestion/list-suggestion.component';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})

export class SuggestionFormComponent  {
  categories: string[] = [ 'Infrastructure et bâtiments', 'Technologie et services numériques', 'Restauration et cafétéria', 'Hygiène et environnement', 'Transport et mobilité', 'Activités et événements', 'Sécurité', 'Communication interne', 'Accessibilité', 'Autre' ];
  suggestionForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router:Router

  ) {

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
  private static generateId(): number {
    return ListSuggestionComponent.suggestions.length;
  }
  onSubmit(): void {
    console.log("gg")
    this.isSubmitted = true;

    if (this.suggestionForm.valid) {
      // Créer la nouvelle suggestion
      const newSuggestion: Suggestion = {
        id: SuggestionFormComponent.generateId(),
        title: this.title?.value,
        description: this.description?.value,
        category: this.category?.value,
        date: new Date(this.date?.value),
        status: this.status?.value,
        likes: 0
      };

      // Ajouter à la liste des suggestions
      ListSuggestionComponent.addSuggestion(newSuggestion);

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
