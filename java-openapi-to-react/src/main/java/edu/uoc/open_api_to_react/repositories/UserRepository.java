package edu.uoc.open_api_to_react.repositories;

import edu.uoc.open_api_to_react.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}