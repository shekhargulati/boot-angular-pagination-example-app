import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrls: ['./todo2.component.css']
})
export class Todo2Component implements OnInit {

  totalElements: number = 0;
  todos: Todo[] = [];
  loading: boolean;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos({ page: "0", size: "10" });
  }

  private getTodos(request) {
    this.loading = true;
    this.todoService.listTodos(request)
      .subscribe(data => {
        this.todos = data['content'];
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getTodos(request);
  }


}
