import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo1Component } from './todo1.component';

describe('Todo1Component', () => {
  let component: Todo1Component;
  let fixture: ComponentFixture<Todo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Todo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Todo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
