import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  listTodos(request) {
    const endpoint = environment.apiUrl + "/todos";
    const params = request;
    return this.http.get(endpoint, { params });
  }
}
