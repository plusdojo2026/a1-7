package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entiry.Frequency;

public interface FrequencyRepository extends JpaRepository<Frequency, Integer> {

}
