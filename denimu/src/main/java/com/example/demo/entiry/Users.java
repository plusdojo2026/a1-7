package com.example.demo.entiry;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	private Integer fireGarbage;
	@JoinColumn(name="gabageType")
	@JsonIgnore
	private Integer nofireGarbage;
	@JoinColumn(name="gabageType")
	@JsonIgnore
	private Integer landfillGarbage;
	@JoinColumn(name="gabageType")
	@JsonIgnore
	private Integer recycleGarbage;
	private Integer targetPrice;
	private Date lastLogin;
	
}



