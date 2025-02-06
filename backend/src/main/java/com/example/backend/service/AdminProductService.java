package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

}
