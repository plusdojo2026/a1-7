package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Images;

public interface ImagesRepository extends JpaRepository<Images, Integer> {

}
