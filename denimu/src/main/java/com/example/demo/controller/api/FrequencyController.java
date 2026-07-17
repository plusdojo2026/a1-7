package com.example.demo.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Frequency; // ⚠️ご自身のEntityのパッケージ名に合わせてください
import com.example.demo.repository.FrequencyRepository; // ⚠️ご自身のRepositoryのパッケージ名に合わせてください

/**
 * ゴミ収集スケジュール（Frequency）のAPIを受け付けるコントローラークラスです。
 * Reactからのリクエストを受け取り、データベースの情報を返します。
 */
@RestController
@RequestMapping("/api/frequency/")
@CrossOrigin(origins = "http://localhost:3000") // 💡React（フロントエンド）からのアクセスを許可する設定です
public class FrequencyController {

    // データベース操作のためのRepositoryを自動的に繋ぎ込みます
    @Autowired
    private FrequencyRepository frequencyRepository;

    /**
     * React側で「fetch('/api/frequency/')」が呼ばれたときに動くメソッドです。
     * frequencyテーブルの全データを取得してJSON形式で返します。
     */
    @GetMapping("/")
    public List<Frequency> getAllFrequencies() {
        // JpaRepositoryの標準機能で、テーブルの全レコードを自動的に取得します
        return frequencyRepository.findAll();
    }
}