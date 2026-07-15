package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.entiry.Products;
import com.example.demo.repository.ProductsRepository;

@Controller
public class SortingController {
	@Autowired
	private ProductsRepository repository;
	
	@GetMapping("/ProductSorting/")
	public String index(Model model) {
		List<Products> products = repository.findAll();
		System.out.println(products);
		model.addAttribute("products", products);
		return "ProductSorting";
	}
}
