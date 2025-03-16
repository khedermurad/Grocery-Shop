package com.example.backend.controller;

import com.example.backend.dto.CategoryView;
import com.example.backend.model.Category;
import com.example.backend.service.AdminCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/categories")
@PreAuthorize("hasRole('ADMIN')")
public class AdminCategoryController {

    private AdminCategoryService adminCategoryService;

    @Autowired
    public AdminCategoryController(AdminCategoryService adminCategoryService) {
        this.adminCategoryService = adminCategoryService;
    }

    @PostMapping
    public ResponseEntity<String> createCategory(@RequestBody Category category){
        return adminCategoryService.saveCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        return adminCategoryService.findCategoryById(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category){
        return adminCategoryService.updateCategoryById(id, category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        return adminCategoryService.deleteCategoryById(id);
    }

    @GetMapping
    public ResponseEntity<List<CategoryView>> getProducts(@RequestParam(name = "name_like", required = false) String name){
        return adminCategoryService.searchCategories(name);
    }


}
