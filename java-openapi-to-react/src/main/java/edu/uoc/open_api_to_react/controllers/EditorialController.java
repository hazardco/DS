package edu.uoc.open_api_to_react.controllers;

import generated.edu.uoc.open_api_to_react.api.EditorialsApi;
import generated.edu.uoc.open_api_to_react.api.EditorialsApiController;
import generated.edu.uoc.open_api_to_react.model.Editorial;
import jakarta.validation.Valid;
import edu.uoc.open_api_to_react.entities.EditorialEntity;
import edu.uoc.open_api_to_react.services.EditorialService;
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
public class EditorialController extends EditorialsApiController implements EditorialsApi {

    private final EditorialService editorialService;

    @Autowired
    public EditorialController(NativeWebRequest request, EditorialService editorialService) {
        super(request);
        this.editorialService = editorialService;
    }

    @Override
    public ResponseEntity<List<Editorial>> getEditorials() {
        List<Editorial> editorials = editorialService.getAllEditorials()
            .stream()
            .map(this::convertEntityToModel)
            .collect(Collectors.toList());
        return ResponseEntity.ok(editorials);
    }

    @Override
    public ResponseEntity<Editorial> getEditorialById(Integer id) {
        Optional<EditorialEntity> optionalEntity = editorialService.getEditorialById(id);
        return optionalEntity
            .map(this::convertEntityToModel)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<Void> createEditorial(@RequestBody @Valid Editorial editorialPayload) {
        EditorialEntity entity = convertModelToEntity(editorialPayload);
        EditorialEntity createdEntity = editorialService.createEditorial(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdEntity.getId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> updateEditorial(Integer id, @RequestBody @Valid Editorial editorialPayload) {
        EditorialEntity entity = convertModelToEntity(editorialPayload);
        try {
            editorialService.updateEditorial(id, entity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteEditorial(Integer id) {
        editorialService.deleteEditorial(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos de conversión entre la entidad y el modelo.

    private Editorial convertEntityToModel(EditorialEntity entity) {
        return new Editorial()
                .id(entity.getId())
                .name(entity.getName())
                .address(entity.getAddress());
    }

    private EditorialEntity convertModelToEntity(Editorial editorial) {
        EditorialEntity entity = new EditorialEntity();
        // Nota: Se ignora el ID en la creación ya que la base de datos lo asigna automáticamente.
        entity.setName(editorial.getName());
        entity.setAddress(editorial.getAddress());
        return entity;
    }
}