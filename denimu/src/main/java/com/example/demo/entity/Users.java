package com.example.demo.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="Users")
public class Users {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable = false)
	private String userId;
	@Column(nullable = false)
	private String pw;
	@Column(nullable = false)
	private String name;
	@JoinColumn(name="gabageType")
	
	private Integer fireGarbage;
	@JoinColumn(name="gabageType")
	
	private Integer nofireGarbage;
	@JoinColumn(name="gabageType")
	
	private Integer landfillGarbage;
	@JoinColumn(name="gabageType")
	
	private Integer recycleGarbage;
	private Integer targetPrice;
	private Date lastLogin;
	
}



