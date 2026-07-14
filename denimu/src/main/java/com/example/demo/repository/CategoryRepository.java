package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entiry.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
