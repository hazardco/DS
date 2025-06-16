package edu.uoc.open_api_to_react.services;

import edu.uoc.open_api_to_react.entities.UserEntity;
import edu.uoc.open_api_to_react.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Retorna la lista de todos los usuarios.
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtiene un usuario por su ID.
    public Optional<UserEntity> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Crea un nuevo usuario.
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    // Actualiza un usuario existente.
    public UserEntity updateUser(Integer id, UserEntity user) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();
            existingUser.setName(user.getName());
            existingUser.setSurname(user.getSurname());
            existingUser.setEmail(user.getEmail());
            existingUser.setBirthdate(user.getBirthdate());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    // Elimina un usuario por ID.
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}