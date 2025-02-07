package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminProductService {

    private ProductRepository productRepository;

    @Autowired
    public AdminProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ResponseEntity<String> saveProduct(Product product){
        if (productRepository.existsById(product.getId())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A product with this Id already exists.");
        }
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
                    return ResponseEntity.ok(existingProduct);
                }).orElse(ResponseEntity.notFound().build());
    }


}
