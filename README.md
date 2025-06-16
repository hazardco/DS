La API de java arranca desde:
VSCode con Spring Boot.
mvn spring-boot:run
docker: 
    docker build -t java-openapi-to-react .
    docker run -p 8080:8080 java-openapi-to-react


El de React imagino que ya sabéis cómo arrancarlo:
npm inpm run dev

La base de datos que se usa es H2, está en memoria y no hace falta instalar nada.
