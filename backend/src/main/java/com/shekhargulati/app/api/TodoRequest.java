package com.shekhargulati.app.api;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TodoRequest {
  private final String task;

  @JsonCreator
  public TodoRequest(@JsonProperty("task") String task) {
    this.task = task;
  }

  public String getTask() {
    return task;
  }
}
