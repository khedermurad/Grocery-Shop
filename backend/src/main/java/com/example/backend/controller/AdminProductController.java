package com.example.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    @GetMapping
    public String getHelloWorld(){
        return "Hello World";
    }

}
