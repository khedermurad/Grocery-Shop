package com.example.backend.controller;

import com.example.backend.model.Product;
import com.example.backend.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    AdminProductService adminProductService;

    @Autowired
    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
    }

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody Product product){
        return adminProductService.saveProduct(product);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        return adminProductService.findProductById(id);
    }

    @GetMapping
    public List<Product> getAllProducts(){
        return adminProductService.findAllProducts();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product,@PathVariable Long id){
        return adminProductService.updateProductById(product, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        return adminProductService.deleteProductById(id);
    }

    @PostMapping(value="/image", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file){
        return adminProductService.saveImage(file);
    }



}
