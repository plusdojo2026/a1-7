package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Products;
import com.example.demo.repository.ProductsRepository;

@RestController
public class SearchController {

    @Autowired
    private ProductsRepository repository;

     @GetMapping("/search/")
    public List<Products> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice) {
        
        // 何も入力されていない場合は全件表示
        if ((keyword == null || keyword.isBlank())
                && (category == null || category.isBlank())
                && minPrice == null
                && maxPrice == null) {

            return repository.findAll();
        }

        // キーワード検索（例）
        if (keyword != null && !keyword.isBlank()) {
            return repository.findByNameContaining(keyword);
        }

        // カテゴリ検索（例）
        if (category != null && !category.isBlank()) {
            return repository.findByCategory(category);
        }

        // 価格検索（例）
        if (minPrice != null && maxPrice !=null) {
            return repository.findBySellingPriceBetween(minPrice, maxPrice);
        }

        return repository.findAll();
    }
}

        















































































































































    

    