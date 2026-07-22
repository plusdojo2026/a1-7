package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Products;
import com.example.demo.repository.ProductsRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CalendarController {

    private final ProductsRepository productsRepository;

    public CalendarController(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @GetMapping("/calc-waste")
    public int calculateAndSaveTotalWaste(
            @RequestParam("id") Integer id,
            @RequestParam(value = "month", required = false) String month, 
            HttpSession session
    ) {
        List<Products> products;

        if (month != null && !month.isEmpty()) {
            products = productsRepository.findByUserIdAndMonth(id, month); 
        } else {
            products = productsRepository.findByUserId(id);
        }

        int totalBuy = 0;
        int totalSell = 0;

        for (Products p : products) {
            if (p.getSellingPrice() != null) {
                totalBuy += p.getSellingPrice();
            }
            if (p.getPurchasePrice() != null) {
                totalSell += p.getPurchasePrice();
            }
        }

        int totalWaste = totalBuy - totalSell;

        session.setAttribute("totalWaste", totalWaste);

        System.out.println("★[" + month + "]のセッション保存値 totalWaste: " + session.getAttribute("totalWaste"));

        return totalWaste;
    }
}