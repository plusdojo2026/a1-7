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
    
    @Query(value = "SELECT * FROM products WHERE user_id = :userId AND DATE_FORMAT(buy_date, '%Y-%m') = :month", nativeQuery = true)
	List<Products> findByUserIdAndMonth(@Param("userId") Integer userId, @Param("month") String month);

	// ごみ出し通知用：checkBox = false（未処理）かつ separation が指定のごみ種別に含まれる商品を取得
	@Query("SELECT p FROM Products p WHERE p.userId = :userId AND p.separation IN :types AND (p.checkBox = false OR p.checkBox IS NULL)")
	List<Products> findUnprocessedByUserIdAndTypes(@Param("userId") Integer userId, @Param("types") List<Integer> types);
}