package com.shekhargulati.app.repository;

import com.shekhargulati.app.domain.Todo;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TodoRepository extends PagingAndSortingRepository<Todo, Long> {
}
