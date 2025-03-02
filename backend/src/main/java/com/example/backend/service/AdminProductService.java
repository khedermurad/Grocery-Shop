package com.example.backend.service;

import com.example.backend.dto.CategoryView;
import com.example.backend.dto.ProductView;
import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AdminProductService {

    private static final String UPLOAD_DIR = "uploads/";

    private static final Logger logger = LoggerFactory.getLogger(AdminProductService.class);



    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public AdminProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }



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

                    String imageUrl = product.getImageUrl();

                    if(imageUrl != null && !imageUrl.isEmpty()){
                        Path filePath = Paths.get("uploads", imageUrl.replace("/uploads/", ""));
                        try {
                            Files.delete(filePath);
                        } catch (IOException e) {
                            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error when deleting the image", e);
                        }
                    }
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

    public ResponseEntity<Map<String, String>> saveImage(MultipartFile file){
        try{

            if(file.isEmpty()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The file must not be empty");
            }

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            Map<String, String> response = new HashMap<>();
            String imageUrl = "/uploads/" + fileName;
            response.put("imageUrl", imageUrl);

            return ResponseEntity.ok(response);
        } catch (IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error when saving the file", e);
        }

    }

    public ResponseEntity<String> deleteImageByUrl(String url){

        if(!url.startsWith("/uploads/")){
            return ResponseEntity.badRequest().build();
        }

        String filePath = Paths.get(UPLOAD_DIR, url.substring("/uploads/".length())).toString();
        File file = new File(filePath);

        if (file.exists()){
            if(file.delete()){
                file.delete();
                return ResponseEntity.noContent().build();
            }
            else {
                return ResponseEntity.status(500).body("Error when deleting the image.");
            }
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }


    public ResponseEntity<List<ProductView>> searchProducts(String name){
        List<Product> products;

        if (name == null || name.isEmpty()){
            products = productRepository.findAll();
        }else {
            products = productRepository.findByNameContainingIgnoreCase(name);
        }

        List<ProductView> productViews = products.stream().map(
                p-> new ProductView(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getStockQuantity(),
                        p.getImageUrl(),
                        new CategoryView(p.getCategory().getId(), p.getCategory().getName())
                )
        ).toList();

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
