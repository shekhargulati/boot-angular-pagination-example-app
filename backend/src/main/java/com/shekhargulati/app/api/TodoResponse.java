package com.shekhargulati.app.api;

import com.shekhargulati.app.domain.Todo;

public class TodoResponse {
  private final Long id;
  private final String task;
  private final boolean done;

  public TodoResponse(Todo todo) {
    this.id = todo.getId();
    this.task = todo.getTask();
    this.done = todo.isDone();
  }

  public Long getId() {
    return id;
  }

  public String getTask() {
    return task;
  }

  public boolean isDone() {
    return done;
  }
}
