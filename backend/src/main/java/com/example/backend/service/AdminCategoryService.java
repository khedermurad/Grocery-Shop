package com.example.backend.service;

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

    public ResponseEntity<String> saveCategory(Category category){
        if(categoryRepository.existsById(category.getId())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A category with this Id already exists.");
        }
        categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ResponseEntity<Category> findCategoryById(Long id){
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public List<Category> findAllCategories(){
        return categoryRepository.findAll();
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


}
