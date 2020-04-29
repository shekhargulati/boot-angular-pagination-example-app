package com.shekhargulati.app.api;

import com.shekhargulati.app.domain.Todo;
import com.shekhargulati.app.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(path = "/todos")
public class TodoResource {

  private final TodoRepository todoRepository;

  @Autowired
  public TodoResource(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  @PostMapping
  public ResponseEntity<Void> create(@RequestBody TodoRequest todoRequest) {
    Todo saved = this.todoRepository.save(
      new Todo(todoRequest.getTask())
    );
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PostMapping(path = "/bulk")
  public ResponseEntity<Void> bulkCreate() {
    for (int i = 1; i <= 100; i++) {
      todoRepository.save(new Todo("Do task " + i));
    }
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PutMapping(path = "/{id}/done")
  public ResponseEntity<Void> done(@PathVariable("id") Long todoId) {
    Optional<Todo> found = this.todoRepository.findById(todoId);
    Todo task = found.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    task.done();
    todoRepository.save(task);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PutMapping(path = "/{id}/undone")
  public ResponseEntity<Void> undone(@PathVariable("id") Long todoId) {
    Optional<Todo> found = this.todoRepository.findById(todoId);
    Todo task = found.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    task.undone();
    todoRepository.save(task);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @GetMapping
  public Page<TodoResponse> list(@RequestParam(name = "page", defaultValue = "0") int page,
                                 @RequestParam(name = "size", defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Todo> pageResult = todoRepository.findAll(pageRequest);
    List<TodoResponse> todos = pageResult
      .stream()
      .map(TodoResponse::new)
      .collect(toList());

    return new PageImpl<>(todos, pageRequest, pageResult.getTotalElements());

  }
}
