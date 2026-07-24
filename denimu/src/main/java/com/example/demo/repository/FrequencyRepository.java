package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Frequency;

public interface FrequencyRepository extends JpaRepository<Frequency, Integer> {

	@Query(value = " SELECT * FROM products WHERE DATE_FORMAT(buy_date, '%Y-%m') = :month",nativeQuery = true)
	List<Frequency> findByMonth(@Param("month") String month);
	
	List<Frequency> findByUserId(Integer id);
	
	@Query("SELECT f FROM Frequency f WHERE f.userId = :userId AND (f.dayOfWeek = :dow OR f.dayOfWeek2 = :dow)")
	List<Frequency> findByUserIdAndDay(@Param("userId") Integer userId, @Param("dow") Integer dow);
	
}
 