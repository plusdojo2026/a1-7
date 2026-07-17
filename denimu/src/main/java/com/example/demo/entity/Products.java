package com.example.demo.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Products")
public class Products {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable = false)
	private Integer userId;
	@Column(nullable = false)
	private Integer ap_type;
	private Boolean checkBox;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private Date buyDate;
	@Column(nullable = false)
	private Integer category;
	@Column(nullable = false)
	private Integer sellingPrice;
	@Column(nullable = false)
	private String valuation;
	private Integer purchasePrice;
	private String memo;
	private Date updatedAt;
	@Column(nullable = false)
	private Date createdAt;
}
