package edu.uoc.open_api_to_react.controllers;

import generated.edu.uoc.open_api_to_react.api.UsersApi;
import generated.edu.uoc.open_api_to_react.api.UsersApiController;
import generated.edu.uoc.open_api_to_react.model.User;
import jakarta.validation.Valid;
import edu.uoc.open_api_to_react.entities.UserEntity;
import edu.uoc.open_api_to_react.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*") // Permite peticiones CORS desde cualquier origen
@RestController
public class UserController extends UsersApiController implements UsersApi {

    private final UserService userService;

    @Autowired
    public UserController(NativeWebRequest request, UserService userService) {
        super(request);
        this.userService = userService;
    }

    @Override
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers()
            .stream()
            .map(this::convertEntityToModel)
            .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @Override
    public ResponseEntity<User> getUserById(Integer id) {
        Optional<UserEntity> optionalUser = userService.getUserById(id);
        return optionalUser
            .map(this::convertEntityToModel)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<Void> createUser(@RequestBody @Valid User userPayload) {
        UserEntity entity = convertModelToEntity(userPayload);
        UserEntity createdEntity = userService.createUser(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdEntity.getId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> updateUser(Integer id, @RequestBody @Valid User userPayload) {
        UserEntity entity = convertModelToEntity(userPayload);
        try {
            userService.updateUser(id, entity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteUser(Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos de conversión entre entidad y modelo.
    private User convertEntityToModel(UserEntity entity) {
        return new User()
                .id(entity.getId())
                .name(entity.getName())
                .surname(entity.getSurname())
                .email(entity.getEmail())
                .birthdate(entity.getBirthdate());
    }

    private UserEntity convertModelToEntity(User user) {
        UserEntity entity = new UserEntity();
        // En la creación, se ignora el ID, pues se asigna automáticamente.
        entity.setName(user.getName());
        entity.setSurname(user.getSurname());
        entity.setEmail(user.getEmail());
        entity.setBirthdate(user.getBirthdate());
        return entity;
    }
}