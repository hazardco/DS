package edu.uoc.open_api_to_react.services;

import edu.uoc.open_api_to_react.entities.AuthorEntity;
import edu.uoc.open_api_to_react.repositories.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    // Retorna la lista de todos los autores.
    public List<AuthorEntity> getAllAuthors() {
        return authorRepository.findAll();
    }

    // Obtiene un autor por su ID.
    public Optional<AuthorEntity> getAuthorById(Integer id) {
        return authorRepository.findById(id);
    }

    // Crea un nuevo autor.
    public AuthorEntity createAuthor(AuthorEntity author) {
        return authorRepository.save(author);
    }

    // Actualiza un autor existente.
    public AuthorEntity updateAuthor(Integer id, AuthorEntity author) {
        Optional<AuthorEntity> optionalAuthor = authorRepository.findById(id);
        if (optionalAuthor.isPresent()) {
            AuthorEntity existingAuthor = optionalAuthor.get();
            existingAuthor.setName(author.getName());
            existingAuthor.setSurname(author.getSurname());
            existingAuthor.setPhone(author.getPhone());
            return authorRepository.save(existingAuthor);
        } else {
            throw new RuntimeException("Autor no encontrado");
        }
    }

    // Elimina un autor por ID.
    public void deleteAuthor(Integer id) {
        authorRepository.deleteById(id);
    }
}
