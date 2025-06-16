package edu.uoc.open_api_to_react.repositories;

import edu.uoc.open_api_to_react.entities.EditorialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditorialRepository extends JpaRepository<EditorialEntity, Integer> {
    // Puedes definir consultas personalizadas si lo necesitas.
}