import {inject, Injectable} from '@angular/core';
import {Suggestion} from '../models/suggestion';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  suggestion: T;
}
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  httpClient: HttpClient = inject(HttpClient);
  suggestionUrl ='http://localhost:3000/suggestions'

   //private suggestionsList: Suggestion[] = [];
  //getSuggestionsList(): Suggestion[] {return this.suggestionsList;}

  getSuggestionsList(): Observable<Suggestion[]> {
    return this.httpClient.get<Suggestion[]>(this.suggestionUrl);
  }

  // Fixed: Extract the 'suggestion' property from the response
  getSuggestionById(id: number): Observable<Suggestion> {

    const url = `${this.suggestionUrl}/${id}`;
    return this.httpClient.get<ApiResponse<Suggestion>>(url).pipe(
      map(response => {
        if (response.success) {
          return response.suggestion;
        } else {
          throw new Error('API request was not successful');
        }
      })
    );
  }
  deleteSuggestion(id: number) {

    return this.httpClient.delete(`${this.suggestionUrl}/${id}`);

  }
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.httpClient.post<Suggestion>(this.suggestionUrl, suggestion);
  }
  constructor() {}


}
