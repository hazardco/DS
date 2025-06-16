package edu.uoc.open_api_to_react.controllers;

import generated.edu.uoc.open_api_to_react.api.CategoriesApi;
import generated.edu.uoc.open_api_to_react.api.CategoriesApiController;
import generated.edu.uoc.open_api_to_react.model.Category;
import jakarta.validation.Valid;
import edu.uoc.open_api_to_react.entities.CategoryEntity;
import edu.uoc.open_api_to_react.services.CategoryService;
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
public class CategoryController extends CategoriesApiController implements CategoriesApi {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(NativeWebRequest request, CategoryService categoryService) {
        super(request);
        this.categoryService = categoryService;
    }

    @Override
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.getAllCategories()
            .stream()
            .map(this::convertEntityToModel)
            .collect(Collectors.toList());
        return ResponseEntity.ok(categories);
    }

    @Override
    public ResponseEntity<Category> getCategoryById(Integer id) {
        Optional<CategoryEntity> optionalEntity = categoryService.getCategoryById(id);
        return optionalEntity
            .map(this::convertEntityToModel)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<Void> createCategory(@RequestBody @Valid Category categoryPayload) {
        CategoryEntity entity = convertModelToEntity(categoryPayload);
        CategoryEntity createdEntity = categoryService.createCategory(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdEntity.getId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> updateCategory(Integer id, @RequestBody @Valid Category categoryPayload) {
        CategoryEntity entity = convertModelToEntity(categoryPayload);
        try {
            categoryService.updateCategory(id, entity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteCategory(Integer id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos de conversión entre la entidad y el modelo.

    private Category convertEntityToModel(CategoryEntity entity) {
        return new Category()
                .id(entity.getId())
                .description(entity.getDescription());
    }

    private CategoryEntity convertModelToEntity(Category category) {
        CategoryEntity entity = new CategoryEntity();
        // Nota: Se ignora el ID en la creación, ya que lo asigna la base de datos.
        entity.setDescription(category.getDescription());
        return entity;
    }
}