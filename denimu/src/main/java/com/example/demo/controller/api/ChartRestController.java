package com.example.demo.controller.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Category;
import com.example.demo.entity.Products;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductsRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
public class ChartRestController {

	  private final ProductsRepository productsRepository;
	  
	  private final CategoryRepository categoryRepository;

	  //repository使えるように
	  public ChartRestController(ProductsRepository productsRepository,
			 CategoryRepository categoryRepository) {
		  this.productsRepository = productsRepository;
		  this.categoryRepository = categoryRepository;
	  }
	  @GetMapping("/graph")
	    public Map<String,Object> graph(
	            @RequestParam String month
	    ) {
		//  System.out.println("受け取った月：" + month);
		  
	        // DBから月指定で取得
	        List<Products> products =
	                productsRepository.findByMonth(month);

	        //System.out.println("件数：" + products.size());
	        

	        
	      //カテゴリごとの集計用
	        Map<Integer, Map<String,Object>> result = new HashMap<>();
	        
	        int totalBuy = 0;
	        int totalSell = 0;

	        for(Products p : products){
	        	
	        	totalBuy += p.getSellingPrice();
		        totalSell += p.getPurchasePrice();

	            Integer category = p.getCategory();


	            //初めて出たカテゴリなら作成
	            if(!result.containsKey(category)){

	                Map<String,Object> data = new HashMap<>();
	                
	                Category c = categoryRepository.findById(category).get();

	                data.put("category", c.getCategoryType());
	                data.put("buy", 0);
	                data.put("sell", 0);

	                result.put(category, data);
	            }


	            Map<String,Object> data = result.get(category);


	            //購入額を加算
	            Integer buy =
	                (Integer)data.get("buy")
	                + p.getSellingPrice();

	            data.put("buy", buy);


	            //売却額を加算
	            Integer sell =
	                (Integer)data.get("sell")
	                + p.getPurchasePrice();

	            data.put("sell", sell);
	        }
	        


	        Map<String,Object> response = new HashMap<>();

	        response.put(
	            "graph",
	            new ArrayList<>(result.values())
	        );

	        response.put(
	            "total",
	            totalBuy - totalSell
	        );


	        return response;
	    }
}