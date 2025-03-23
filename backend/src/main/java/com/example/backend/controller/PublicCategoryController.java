package com.example.backend.controller;

import com.example.backend.dto.CategoryView;
import com.example.backend.model.Category;
import com.example.backend.service.PublicCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/categories")
public class PublicCategoryController {


    private PublicCategoryService categoryService;

    @Autowired
    public PublicCategoryController(PublicCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryView> getCategory(@PathVariable Long id){
        return categoryService.findCategoryById(id);
    }

    @GetMapping
    public ResponseEntity<List<CategoryView>> getCategories(@RequestParam(name = "name_like", required = false) String name){
        return categoryService.searchCategories(name);
    }

}
