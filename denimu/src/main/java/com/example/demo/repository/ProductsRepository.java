package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entiry.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

}
