package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

    List<Products> findByNameContaining(String keyword);
   
    List<Products> findByCategory(String category);

    List<Products> findBySellingPriceBetween(Integer minPrice, Integer maxPrice);

}