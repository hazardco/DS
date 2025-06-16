package edu.uoc.open_api_to_react.repositories;

import edu.uoc.open_api_to_react.entities.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {
}
