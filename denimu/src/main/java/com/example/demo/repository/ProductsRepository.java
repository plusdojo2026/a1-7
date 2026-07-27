package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

	@Query(value = "SELECT * FROM products WHERE DATE_FORMAT(buy_date, '%Y-%m') = :month", nativeQuery = true)
	List<Products> findByMonth(@Param("month") String month);
	
	List<Products> findByNameContaining(String keyword);
	
	List<Products> findByCategory(Integer category);

	List<Products> findBySellingPriceBetween(Integer minPrice, Integer maxPrice);
	
	List<Products> findByUserId(Integer id);
	
	@Query(value = "SELECT * FROM products WHERE user_id = :userId AND DATE_FORMAT(buy_date, '%Y-%m') = :month", nativeQuery = true)
	List<Products> findByUserIdAndMonth(@Param("userId") Integer userId, @Param("month") String month);

	@Query("SELECT p FROM Products p WHERE p.userId = :userId AND p.separation IN :types AND (p.checkBox = false OR p.checkBox IS NULL)")
	List<Products> findUnprocessedByUserIdAndTypes(@Param("userId") Integer userId, @Param("types") List<Integer> types);
	

	@Query("SELECT p FROM Products p WHERE " +
	       "(:keyword IS NULL OR :keyword = '' OR p.name LIKE %:keyword%) AND " +
	       "(:category IS NULL OR p.category = :category) AND " +
	       "(:minPrice IS NULL OR p.sellingPrice >= :minPrice) AND " +
	       "(:maxPrice IS NULL OR p.sellingPrice <= :maxPrice) AND " +
	       "(:startDate IS NULL OR p.buyDate >= :startDate) AND " +
	       "(:endDate IS NULL OR p.buyDate <= :endDate) " +
	       "ORDER BY " +
	       "CASE WHEN :sortBy = 'buyDate' AND :direction = 'asc' THEN p.buyDate END ASC, " +
	       "CASE WHEN :sortBy = 'buyDate' AND :direction = 'desc' THEN p.buyDate END DESC, " +
	       "CASE WHEN :sortBy = 'sellingPrice' AND :direction = 'asc' THEN p.sellingPrice END ASC, " +
	       "CASE WHEN :sortBy = 'sellingPrice' AND :direction = 'desc' THEN p.sellingPrice END DESC, " +
	       "CASE WHEN :sortBy = 'valuation' AND :direction = 'asc' THEN p.valuation END ASC, " +
	       "CASE WHEN :sortBy = 'valuation' AND :direction = 'desc' THEN p.valuation END DESC, " +
	       "p.id ASC")
	List<Products> searchProducts(
	        @Param("keyword") String keyword, 
	        @Param("category") Integer category,
	        @Param("minPrice") Integer minPrice,
	        @Param("maxPrice") Integer maxPrice,
	        @Param("startDate") Date startDate,
	        @Param("endDate") Date endDate,
	        @Param("sortBy") String sortBy,
	        @Param("direction") String direction);
}