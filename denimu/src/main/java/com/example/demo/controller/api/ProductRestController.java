package com.example.demo.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Products;
import com.example.demo.repository.ProductsRepository;

@RestController
public class ProductRestController {

	@Autowired
	ProductsRepository repository;
	
	@GetMapping("/api/waste/")
	private List<Products> get(){
		return repository.findAll();
	}
	
	@PostMapping("/api/waste/add/")
	private Products add(@RequestBody Products product) {
		repository.save(product);
		return product;
	}
	
	@PostMapping("/api/waste/mod/")
	private Products mod(@RequestBody Products product) {
		repository.save(product);
		return product;
	}
	
	@PostMapping("/api/waste/del/")
	private Products del(@RequestBody Products product) {
	    repository.delete(product);
	    return product; 
	}
}
