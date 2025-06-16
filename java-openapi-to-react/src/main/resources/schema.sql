CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    birthdate DATE
);

-- Tabla para categorías
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- Creación de la tabla authors
CREATE TABLE authors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL
);

-- Creación de la tabla editoriales
CREATE TABLE editorials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255)
);

-- Tabla para libros
CREATE TABLE books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category_id BIGINT,
    author_id BIGINT,
    editorial_id BIGINT,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id),
    CONSTRAINT fk_editorial FOREIGN KEY (editorial_id) REFERENCES editorials(id)
);