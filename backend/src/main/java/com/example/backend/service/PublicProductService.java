package com.example.backend.service;

import com.example.backend.dto.CategoryView;
import com.example.backend.dto.ProductView;
import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PublicProductService {

    private ProductRepository productRepository;

    @Autowired
    public PublicProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public ResponseEntity<ProductView> findProductById(Long id){
        return productRepository.findById(id)
                .map(p ->
                        new ProductView(p.getId(),
                                p.getName(),
                                p.getDescription(),
                                p.getPrice(),
                                p.getStockQuantity(),
                                p.getImageUrl(),
                                new CategoryView(p.getCategory().getId(), p.getCategory().getName())))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    public ResponseEntity<List<ProductView>> findProductByCategory(Long categoryId){
        List<ProductView> productViews = productRepository.findByCategoryId(categoryId)
                .stream().map(p ->
                    new ProductView(p.getId(),
                                    p.getName(),
                                    p.getDescription(),
                                    p.getPrice(),
                                    p.getStockQuantity(),
                                    p.getImageUrl(),
                                    new CategoryView(p.getCategory().getId(), p.getCategory().getName()))
                    ).toList();

        return ResponseEntity.ok(productViews);
    }


    public ResponseEntity<List<ProductView>> searchProducts(String name){
        List<Product> products;

        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        products = productRepository.searchByNameOrCategoryName(name);


        List<ProductView> productViews = products.stream().map(
                p -> new ProductView(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getStockQuantity(),
                        p.getImageUrl(),
                        new CategoryView(p.getCategory().getId(), p.getCategory().getName()))).toList();

        return ResponseEntity.ok(productViews);
    }

    public ResponseEntity<Resource> loadImage(String filename){
        try {
            Path filePath = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }


            return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
        }catch (IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error when loading the file", e);
        }

    }

}
