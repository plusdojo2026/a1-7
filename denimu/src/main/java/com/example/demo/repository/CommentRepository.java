package com.example.demo.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query(value = "SELECT * FROM comment WHERE id IN (:ids) ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Comment findRandomCommentInIds(@Param("ids") List<Integer> ids);
}