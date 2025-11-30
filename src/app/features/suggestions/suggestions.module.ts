import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './core/suggestion-details/suggestion-details.component';
import {MatIcon} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailsComponent
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    MatIcon,
    ReactiveFormsModule
  ]
})
export class SuggestionsModule { }
