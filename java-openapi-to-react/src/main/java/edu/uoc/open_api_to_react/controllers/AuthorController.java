package edu.uoc.open_api_to_react.controllers;

import generated.edu.uoc.open_api_to_react.api.AuthorsApi;
import generated.edu.uoc.open_api_to_react.api.AuthorsApiController;
import generated.edu.uoc.open_api_to_react.model.Author;
import jakarta.validation.Valid;
import edu.uoc.open_api_to_react.entities.AuthorEntity;
import edu.uoc.open_api_to_react.services.AuthorService;
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
public class AuthorController extends AuthorsApiController implements AuthorsApi {

    private final AuthorService authorService;

    @Autowired
    public AuthorController(NativeWebRequest request, AuthorService authorService) {
        super(request);
        this.authorService = authorService;
    }

    @Override
    public ResponseEntity<List<Author>> getAuthors() {
        List<Author> authors = authorService.getAllAuthors()
            .stream()
            .map(this::convertEntityToModel)
            .collect(Collectors.toList());
        return ResponseEntity.ok(authors);
    }

    @Override
    public ResponseEntity<Author> getAuthorById(Integer id) {
        Optional<AuthorEntity> optionalEntity = authorService.getAuthorById(id);
        return optionalEntity
            .map(this::convertEntityToModel)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Crea un nuevo autor.
     * Nota: La firma en la interfaz generada indica ResponseEntity<Void>, por lo
     * que no se retorna directamente el objeto creado, sino solo el estado (y header Location, opcional).
     */
    @Override
    public ResponseEntity<Void> createAuthor(@RequestBody @Valid Author authorPayload) {
        // Convertir el modelo recibido a entidad JPA.
        AuthorEntity entity = convertModelToEntity(authorPayload);
        AuthorEntity createdEntity = authorService.createAuthor(entity);
        // Construir la URI del recurso creado (opcional).
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdEntity.getId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    /**
     * Actualiza un autor existente.
     * Siguiendo la firma generada, se retorna ResponseEntity<Void>.
     */
    @Override
    public ResponseEntity<Void> updateAuthor(Integer id, @RequestBody @Valid Author authorPayload) {
        AuthorEntity entity = convertModelToEntity(authorPayload);
        try {
            authorService.updateAuthor(id, entity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteAuthor(Integer id) {
        authorService.deleteAuthor(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos de conversión entre la entidad y el modelo.

    private Author convertEntityToModel(AuthorEntity entity) {
        return new Author()
                .id(entity.getId())
                .name(entity.getName())
                .surname(entity.getSurname())
                .phone(entity.getPhone());
    }

    private AuthorEntity convertModelToEntity(Author author) {
        AuthorEntity entity = new AuthorEntity();
        // Nota: Se ignora el ID para creaciones, ya que lo asigna la base de datos.
        entity.setName(author.getName());
        entity.setSurname(author.getSurname());
        entity.setPhone(author.getPhone());
        return entity;
    }
}
