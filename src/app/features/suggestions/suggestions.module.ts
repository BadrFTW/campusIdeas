import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './core/suggestion-details/suggestion-details.component';
import {MatIcon} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { SuggestionFormComponent } from './core/suggestion-form/suggestion-form.component';


@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailsComponent,
    SuggestionFormComponent
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    MatIcon,
    ReactiveFormsModule
  ]
})
export class SuggestionsModule { }
