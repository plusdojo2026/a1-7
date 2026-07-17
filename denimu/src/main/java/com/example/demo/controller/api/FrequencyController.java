package com.example.demo.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Frequency;
import com.example.demo.repository.FrequencyRepository; 

/**
 * ゴミ収集スケジュール（Frequency）のAPIを受け付けるコントローラークラスです。
 * Reactからのリクエストを受け取り、データベースの情報を返します。
 */
@RestController
@RequestMapping("/api/frequency/")
@CrossOrigin(origins = "http://localhost:3000") 
public class FrequencyController {

    @Autowired
    private FrequencyRepository frequencyRepository;

    /**
     * React側で「fetch('/api/frequency/')」が呼ばれたときに動くメソッドです。
     * frequencyテーブルの全データを取得してJSON形式で返します。
     */
    @GetMapping("/")
    public List<Frequency> getAllFrequencies() {
        return frequencyRepository.findAll();
    }
}