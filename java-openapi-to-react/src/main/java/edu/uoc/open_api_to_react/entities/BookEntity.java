package edu.uoc.open_api_to_react.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String title;
    
    @ManyToOne
    private CategoryEntity category;
    
    @ManyToOne
    private AuthorEntity author;
    
    @ManyToOne
    private EditorialEntity editorial;

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    public AuthorEntity getAuthor() {
        return author;
    }

    public void setAuthor(AuthorEntity author) {
        this.author = author;
    }

    public EditorialEntity getEditorial() {
        return editorial;
    }

    public void setEditorial(EditorialEntity editorial) {
        this.editorial = editorial;
    }
}