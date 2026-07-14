package com.example.demo.entiry;

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
@Table(name="Frequency")
public class Frequency {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable = false)
	private Integer userId;
	private Integer gabageType;
	private Boolean firstWeek;
	private Boolean secondWeek;
	private Boolean thirdWeek;
	private Boolean fouthWeek;
	private Integer dayOfWeek;
	private Integer dayOfWeek2;
	
}


