package com.example.backend.repository;

import com.example.backend.dto.CategoryView;
import com.example.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<CategoryView> findAllBy();
}
