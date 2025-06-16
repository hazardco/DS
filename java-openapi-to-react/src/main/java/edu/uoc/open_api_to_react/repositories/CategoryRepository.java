package edu.uoc.open_api_to_react.repositories;

import edu.uoc.open_api_to_react.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    // Aquí puedes definir consultas personalizadas si lo necesitas
}