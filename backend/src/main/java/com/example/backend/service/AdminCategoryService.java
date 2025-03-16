package com.example.backend.service;

import com.example.backend.dto.CategoryView;
import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminCategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public AdminCategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<String> saveCategory(Category category) {
        if (category.getId() != null && categoryRepository.existsById(category.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A category with this Id already exists.");
        }

        category.setCreatedAt(LocalDateTime.now());

        categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    public ResponseEntity<Category> findCategoryById(Long id){
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // using findAllBy to get Categories without product
    public List<CategoryView> findAllCategories(){
        return categoryRepository.findAllBy();
    }

    public ResponseEntity<?> deleteCategoryById(Long id){
        return categoryRepository.findById(id)
                .map( category ->
                        {
                            categoryRepository.delete(category);
                            return ResponseEntity.noContent().build();
                        }
                ).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Category> updateCategoryById(Long id, Category category){
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setName(category.getName());
                    existingCategory.setCreatedAt(LocalDateTime.now());
                    categoryRepository.save(existingCategory);

                    return ResponseEntity.ok(existingCategory);
                }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<List<CategoryView>> searchCategories(String name){
        List<Category> categories;

        if (name == null || name.isEmpty()){
            categories = categoryRepository.findAll();
        }else{
            categories = categoryRepository.findByNameContainingIgnoreCase(name);
        }

        List<CategoryView> categoryViews = categories.stream().map(category ->
                new CategoryView(category.getId(), category.getName())).toList();

        return ResponseEntity.ok(categoryViews);
    }


}
