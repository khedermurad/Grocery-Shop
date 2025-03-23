package com.example.backend.controller;

import com.example.backend.dto.ProductView;
import com.example.backend.service.PublicProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/products")
public class PublicProductController {

    private PublicProductService productService;

    @Autowired
    public PublicProductController(PublicProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductView> getProductById(@PathVariable Long id){
        return productService.findProductById(id);
    }

    @GetMapping("/by-category")
    public ResponseEntity<List<ProductView>> getProductsByCategory(@RequestParam(name = "category_id") Long categoryId){
        return productService.findProductByCategory(categoryId);
    }


    @GetMapping("/search")
    public ResponseEntity<List<ProductView>> getProducts(@RequestParam(name = "name_like") String name){
        return productService.searchProducts(name);
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename){
        return productService.loadImage(filename);
    }

}
