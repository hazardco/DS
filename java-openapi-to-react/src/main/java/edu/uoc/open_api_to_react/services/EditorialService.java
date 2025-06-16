package edu.uoc.open_api_to_react.services;

import edu.uoc.open_api_to_react.entities.EditorialEntity;
import edu.uoc.open_api_to_react.repositories.EditorialRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EditorialService {

    private final EditorialRepository editorialRepository;

    public EditorialService(EditorialRepository editorialRepository) {
        this.editorialRepository = editorialRepository;
    }

    // Retorna la lista de todas las editoriales.
    public List<EditorialEntity> getAllEditorials() {
        return editorialRepository.findAll();
    }

    // Obtiene una editorial por su ID.
    public Optional<EditorialEntity> getEditorialById(Integer id) {
        return editorialRepository.findById(id);
    }

    // Crea una nueva editorial.
    public EditorialEntity createEditorial(EditorialEntity editorial) {
        return editorialRepository.save(editorial);
    }

    // Actualiza una editorial existente.
    public EditorialEntity updateEditorial(Integer id, EditorialEntity editorial) {
        Optional<EditorialEntity> optionalEditorial = editorialRepository.findById(id);
        if (optionalEditorial.isPresent()) {
            EditorialEntity existingEditorial = optionalEditorial.get();
            existingEditorial.setName(editorial.getName());
            existingEditorial.setAddress(editorial.getAddress());
            return editorialRepository.save(existingEditorial);
        } else {
            throw new RuntimeException("Editorial no encontrada");
        }
    }

    // Elimina una editorial por ID.
    public void deleteEditorial(Integer id) {
        editorialRepository.deleteById(id);
    }
}