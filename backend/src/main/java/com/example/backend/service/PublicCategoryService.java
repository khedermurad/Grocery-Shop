package com.example.backend.service;

import com.example.backend.dto.CategoryView;
import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicCategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public PublicCategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public ResponseEntity<CategoryView> findCategoryById(Long id){
        return categoryRepository.findById(id)
                .map(category -> new CategoryView(category.getId(), category.getName()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
