import { DataSource } from '@angular/cdk/table';
import { TodoListResponse, Todo } from './todo';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { TodoService } from './todo.service';
import { catchError, finalize } from "rxjs/operators";

export class TodoDataSource implements DataSource<Todo>{

    private todoSubject = new BehaviorSubject<Todo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private todoService: TodoService) { }

    connect(collectionViewer: CollectionViewer): Observable<Todo[]> {
        return this.todoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadTodos(pageNumber = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.todoService.listTodos({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: TodoListResponse) => {
                this.todoSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }

}