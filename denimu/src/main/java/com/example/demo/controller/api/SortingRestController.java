package com.example.demo.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Products;
import com.example.demo.entity.Users;
import com.example.demo.repository.ProductsRepository;
import com.example.demo.repository.UsersRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
public class SortingRestController {
	@Autowired
	ProductsRepository repository;
	@Autowired
	UsersRepository usersrepository;
	
	@PostMapping("/sorting/add/")
	private List<Products> add(@RequestBody List<Products> product) {
		repository.saveAll(product);
		return product;
	}
	
	@GetMapping("/sortuser/")
	private List<Users> sortuser(@RequestParam("id") Integer id){
		return usersrepository.findAllById(List.of(id));
	}
	
	@GetMapping("/sorting/")
	private List<Products> get(@RequestParam("id") Integer id){
		return repository.findByUserId(id);
	}
	
	
	@PostMapping("/sorting/mod/")
	private Products mod(@RequestBody Products products) {
		repository.save(products);
		return products;
	}
	
	@PostMapping("/sorting/del/")
	private Products del(@RequestBody Products products) {
		repository.delete(products);
		return products;
	}
}
