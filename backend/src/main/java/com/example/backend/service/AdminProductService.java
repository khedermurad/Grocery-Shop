package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminProductService {
    private static final Logger logger = LoggerFactory.getLogger(AdminProductService.class);

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public AdminProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

//    public ResponseEntity<String> saveProduct(Product product) {
//        logger.info("Speichern eines neuen Produkts...");
//
//        if (product.getCategory() == null || product.getCategory().getId() == null) {
//            logger.error("Kategorie-ID ist null!");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category ID is required.");
//        }
//
//        logger.info("Kategorie-ID erhalten: " + product.getCategory().getId());
//
//        Category category = categoryRepository.findById(product.getCategory().getId())
//                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + product.getCategory().getId()));
//
//        product.setCategory(category);
//        product.setCreatedAt(LocalDateTime.now());
//        productRepository.save(product);
//
//        logger.info("Produkt erfolgreich gespeichert mit ID: " + product.getId());
//        return ResponseEntity.status(HttpStatus.CREATED).body("Product created successfully.");
//    }


    public ResponseEntity<String> saveProduct(Product product){
        if (product.getId() != null && productRepository.existsById(product.getId())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A product with this Id already exists.");
        }

        if(product.getCategory() != null && product.getCategory().getId() != null){
            product.setCategory(categoryRepository.findById(product.getCategory().getId()).orElseThrow(
                    () -> new IllegalArgumentException("Category not found")
            ));
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category ID is required.");
        }

        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ResponseEntity<Product> findProductById(Long id){
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public List<Product> findAllProducts(){
        return productRepository.findAll();
    }

    public ResponseEntity<?> deleteProductById(Long id){
        return productRepository.findById(id)
                .map( product -> {
                    productRepository.delete(product);
                    return ResponseEntity.noContent().build();
                        }
                ).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Product> updateProductById(Product product, Long id){
        return productRepository.findById(id)
                .map(existingProduct -> {
                    if(product.getCategory() != null){
                        existingProduct.setCategory(product.getCategory());
                    }
                    if(product.getDescription() != null){
                        existingProduct.setDescription(product.getDescription());
                    }
                    if (product.getImageUrl() != null){
                        existingProduct.setImageUrl(product.getImageUrl());
                    }
                    if (product.getName() != null){
                        existingProduct.setName(product.getName());
                    }
                    if (product.getPrice() != null){
                        existingProduct.setPrice(product.getPrice());
                    }
                    if (product.getStockQuantity() != null){
                        existingProduct.setStockQuantity(product.getStockQuantity());
                    }
                    existingProduct.setUpdatedAt(LocalDateTime.now());
                    productRepository.save(existingProduct);
                    return ResponseEntity.ok(existingProduct);
                }).orElse(ResponseEntity.notFound().build());
    }


}
