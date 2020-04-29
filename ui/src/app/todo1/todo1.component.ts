import { Component, ViewChild } from '@angular/core';
import { TodoDataSource } from '../todo.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { TodoService } from '../todo.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo2',
  templateUrl: './todo1.component.html',
  styleUrls: ['./todo1.component.css']
})
export class Todo1Component {

  displayedColumns = ['id', 'task', 'done'];
  todoDatasource: TodoDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoDatasource = new TodoDataSource(this.todoService);
    this.todoDatasource.loadTodos();
  }

  ngAfterViewInit() {
    this.todoDatasource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadTodos())
      )
      .subscribe();
  }

  loadTodos() {
    this.todoDatasource.loadTodos(this.paginator.pageIndex, this.paginator.pageSize);
  }


}
