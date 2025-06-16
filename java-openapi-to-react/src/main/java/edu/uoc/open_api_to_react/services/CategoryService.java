package edu.uoc.open_api_to_react.services;

import edu.uoc.open_api_to_react.entities.CategoryEntity;
import edu.uoc.open_api_to_react.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Retorna la lista de todas las categorías.
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Obtiene una categoría por su ID.
    public Optional<CategoryEntity> getCategoryById(Integer id) {
        return categoryRepository.findById(id);
    }

    // Crea una nueva categoría.
    public CategoryEntity createCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    // Actualiza una categoría existente.
    public CategoryEntity updateCategory(Integer id, CategoryEntity category) {
        Optional<CategoryEntity> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            CategoryEntity existingCategory = optionalCategory.get();
            existingCategory.setDescription(category.getDescription());
            return categoryRepository.save(existingCategory);
        } else {
            throw new RuntimeException("Categoría no encontrada");
        }
    }

    // Elimina una categoría por ID.
    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}