package edu.uoc.open_api_to_react.controllers;

import generated.edu.uoc.open_api_to_react.api.BooksApi;
import generated.edu.uoc.open_api_to_react.api.BooksApiController;
import generated.edu.uoc.open_api_to_react.model.Book;
import generated.edu.uoc.open_api_to_react.model.Category;
import generated.edu.uoc.open_api_to_react.model.Author;
import generated.edu.uoc.open_api_to_react.model.Editorial;
import jakarta.validation.Valid;
import edu.uoc.open_api_to_react.entities.BookEntity;
import edu.uoc.open_api_to_react.entities.CategoryEntity;
import edu.uoc.open_api_to_react.entities.AuthorEntity;
import edu.uoc.open_api_to_react.entities.EditorialEntity;
import edu.uoc.open_api_to_react.services.BookService;
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
public class BookController extends BooksApiController implements BooksApi {

    private final BookService bookService;

    @Autowired
    public BookController(NativeWebRequest request, BookService bookService) {
        super(request);
        this.bookService = bookService;
    }

    @Override
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> books = bookService.getAllBooks()
                .stream()
                .map(this::convertEntityToModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok(books);
    }

    @Override
    public ResponseEntity<Book> getBookById(Integer id) {
        Optional<BookEntity> optionalEntity = bookService.getBookById(id);
        return optionalEntity
                .map(this::convertEntityToModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<Void> createBook(@RequestBody @Valid Book bookPayload) {
        BookEntity entity = convertModelToEntity(bookPayload);
        BookEntity createdEntity = bookService.createBook(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdEntity.getId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> updateBook(Integer id, @RequestBody @Valid Book bookPayload) {
        BookEntity entity = convertModelToEntity(bookPayload);
        try {
            bookService.updateBook(id, entity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteBook(Integer id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // Conversión entre entidad y modelo

    private Book convertEntityToModel(BookEntity entity) {
        return new Book()
                .id(entity.getId())
                .title(entity.getTitle())
                .category(convertCategoryEntityToModel(entity.getCategory()))
                .author(convertAuthorEntityToModel(entity.getAuthor()))
                .editorial(convertEditorialEntityToModel(entity.getEditorial()));
    }

    private BookEntity convertModelToEntity(Book book) {
        BookEntity entity = new BookEntity();
        // Se ignora el id en la creación pues lo asigna la base de datos.
        entity.setTitle(book.getTitle());
        entity.setCategory(convertCategoryModelToEntity(book.getCategory()));
        entity.setAuthor(convertAuthorModelToEntity(book.getAuthor()));
        entity.setEditorial(convertEditorialModelToEntity(book.getEditorial()));
        return entity;
    }

    // Métodos de conversión para objetos complejos

    private Category convertCategoryEntityToModel(CategoryEntity categoryEntity) {
        return new Category()
                .id(categoryEntity.getId())
                .description(categoryEntity.getDescription());
    }

    private CategoryEntity convertCategoryModelToEntity(Category category) {
        CategoryEntity entity = new CategoryEntity();
        entity.setId(category.getId()); // Se copia el id
        entity.setDescription(category.getDescription());
        return entity;
    }

    private Author convertAuthorEntityToModel(AuthorEntity authorEntity) {
        return new Author()
                .id(authorEntity.getId())
                .name(authorEntity.getName());
    }

    private AuthorEntity convertAuthorModelToEntity(Author author) {
        AuthorEntity entity = new AuthorEntity();
        entity.setId(author.getId()); // Se copia el id
        entity.setName(author.getName());
        // Si existieran más atributos como surname o phone, también deben copiarse.
        // Por ejemplo:
        // entity.setSurname(author.getSurname());
        // entity.setPhone(author.getPhone());
        return entity;
    }

    private Editorial convertEditorialEntityToModel(EditorialEntity editorialEntity) {
        return new Editorial()
                .id(editorialEntity.getId())
                .name(editorialEntity.getName());
    }

    private EditorialEntity convertEditorialModelToEntity(Editorial editorial) {
        EditorialEntity entity = new EditorialEntity();
        entity.setId(editorial.getId()); // Se copia el id
        entity.setName(editorial.getName());
        // Si existen más atributos, copiarlos también, como address:
        // entity.setAddress(editorial.getAddress());
        return entity;
    }
}
