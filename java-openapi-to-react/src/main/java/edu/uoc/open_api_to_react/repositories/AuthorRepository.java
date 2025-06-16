package edu.uoc.open_api_to_react.repositories;

import edu.uoc.open_api_to_react.entities.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<AuthorEntity, Integer> {
    // Puedes agregar consultas personalizadas si es necesario
}
