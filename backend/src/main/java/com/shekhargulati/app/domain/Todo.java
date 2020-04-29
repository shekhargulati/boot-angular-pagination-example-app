package com.shekhargulati.app.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "todos")
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String task;

  private boolean done;

  Todo() {
  }

  public Todo(String task) {
    this.task = task;
  }

  public void done() {
    this.done = true;
  }

  public void undone() {
    this.done = false;
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
