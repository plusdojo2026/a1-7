package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

	@Query(value = " SELECT * FROM products WHERE DATE_FORMAT(buy_date, '%Y-%m') = :month",nativeQuery = true)
	List<Products> findByMonth(@Param("month") String month);

	
    List<Products> findByNameContaining(String keyword);
   
    List<Products> findByCategory(String category);

    List<Products> findBySellingPriceBetween(Integer minPrice, Integer maxPrice);

    List<Products> findByUserId(Integer id);
}