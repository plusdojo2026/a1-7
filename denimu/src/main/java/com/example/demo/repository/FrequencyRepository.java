package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Frequency;

public interface FrequencyRepository extends JpaRepository<Frequency, Integer> {

}
