package com.example.backend.controller;

import com.example.backend.dto.ProductView;
import com.example.backend.service.PublicProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    public ResponseEntity<Page<ProductView>> getProductsByCategory(@RequestParam(name = "category_id") Long categoryId,
                                                                   @RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "20") int size){
        return productService.findProductByCategory(categoryId, page, size);
    }


    @GetMapping("/search")
    public ResponseEntity<Page<ProductView>> getProducts(@RequestParam(required = false) String query,
                                                         @RequestParam(required = false) Long categoryId,
                                                         @RequestParam(required = false) BigDecimal minPrice,
                                                         @RequestParam(required = false) BigDecimal maxPrice,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "20") int size){
        System.out.println("Query type: " + (query != null ? query.getClass().getName() : "null"));
        System.out.println("Query value: " + query);
        return productService.searchProducts(query,categoryId, minPrice, maxPrice, page, size);
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename){
        return productService.loadImage(filename);
    }



}
