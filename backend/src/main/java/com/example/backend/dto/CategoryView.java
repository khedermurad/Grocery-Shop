package com.example.backend.dto;

public class CategoryView {
    private Long id;
    private String name;

    public CategoryView(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
