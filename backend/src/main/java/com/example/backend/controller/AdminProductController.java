package com.example.backend.controller;

import com.example.backend.dto.ProductView;
import com.example.backend.model.Product;
import com.example.backend.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
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
    public ResponseEntity<ProductView> getProductById(@PathVariable Long id){
        return adminProductService.findProductById(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long id){
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


    @DeleteMapping("/image")
    public ResponseEntity<String> deleteImage(@RequestParam String imageUrl){
        return adminProductService.deleteImageByUrl(imageUrl);
    }

    @GetMapping
    public ResponseEntity<List<ProductView>> getProducts(@RequestParam(name = "name_like", required = false) String name){
        return adminProductService.searchProducts(name);
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename){
        return adminProductService.loadImage(filename);
    }


}
