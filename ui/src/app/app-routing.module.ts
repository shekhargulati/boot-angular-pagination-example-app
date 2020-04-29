import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Todo2Component } from './todo2/todo2.component';
import { Todo1Component } from './todo1/todo1.component';


const routes: Routes = [
  {path : 'todos1', component: Todo1Component},
  {path : 'todos2', component: Todo2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
