package edu.uoc.open_api_to_react.services;

import edu.uoc.open_api_to_react.entities.AuthorEntity;
import edu.uoc.open_api_to_react.entities.BookEntity;
import edu.uoc.open_api_to_react.entities.CategoryEntity;
import edu.uoc.open_api_to_react.entities.EditorialEntity;
import edu.uoc.open_api_to_react.repositories.AuthorRepository;
import edu.uoc.open_api_to_react.repositories.BookRepository;
import edu.uoc.open_api_to_react.repositories.CategoryRepository;
import edu.uoc.open_api_to_react.repositories.EditorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    private final EditorialRepository editorialRepository;

    @Autowired
    public BookService(BookRepository bookRepository,
                       AuthorRepository authorRepository,
                       CategoryRepository categoryRepository,
                       EditorialRepository editorialRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
        this.editorialRepository = editorialRepository;
    }

    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<BookEntity> getBookById(Integer id) {
        return bookRepository.findById(id);
    }

    public BookEntity createBook(BookEntity bookEntity) {
        // Reemplazar instancias transitorias por las existentes.
        bookEntity.setAuthor(getManagedAuthor(bookEntity.getAuthor()));
        bookEntity.setCategory(getManagedCategory(bookEntity.getCategory()));
        bookEntity.setEditorial(getManagedEditorial(bookEntity.getEditorial()));

        return bookRepository.save(bookEntity);
    }

    public BookEntity updateBook(Integer id, BookEntity bookEntity) {
        Optional<BookEntity> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            BookEntity existingBook = optionalBook.get();
            existingBook.setTitle(bookEntity.getTitle());
            existingBook.setAuthor(getManagedAuthor(bookEntity.getAuthor()));
            existingBook.setCategory(getManagedCategory(bookEntity.getCategory()));
            existingBook.setEditorial(getManagedEditorial(bookEntity.getEditorial()));
            return bookRepository.save(existingBook);
        } else {
            throw new RuntimeException("El libro con id " + id + " no existe.");
        }
    }

    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }

    private AuthorEntity getManagedAuthor(AuthorEntity authorEntity) {
        if (authorEntity == null || authorEntity.getId() == null) {
            throw new IllegalArgumentException("El autor es obligatorio y su id no puede ser null.");
        }
        Integer authorId = authorEntity.getId();
        return authorRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("No se encontró el Autor con id " + authorId));
    }

    private CategoryEntity getManagedCategory(CategoryEntity categoryEntity) {
        if (categoryEntity == null || categoryEntity.getId() == null) {
            throw new IllegalArgumentException("La categoría es obligatoria y su id no puede ser null.");
        }
        Integer categoryId = categoryEntity.getId();
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("No se encontró la Categoría con id " + categoryId));
    }

    private EditorialEntity getManagedEditorial(EditorialEntity editorialEntity) {
        if (editorialEntity == null || editorialEntity.getId() == null) {
            throw new IllegalArgumentException("La editorial es obligatoria y su id no puede ser null.");
        }
        Integer editorialId = editorialEntity.getId();
        return editorialRepository.findById(editorialId)
                .orElseThrow(() -> new RuntimeException("No se encontró la Editorial con id " + editorialId));
    }
}
