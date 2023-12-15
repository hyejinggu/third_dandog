package com.i4.dandog.domain;

import lombok.Data;

@Data
public class ReviewInfoDTO {

	private String neighborBrandName;
	private Long reviewCount;
	private Double averageRating;

	// 기본 생성자 (반드시 필요)
	public ReviewInfoDTO() {
	}

	// 수정된 생성자
	public ReviewInfoDTO(String neighborBrandName, Long reviewCount, Double averageRating) {
		this.neighborBrandName = neighborBrandName;
		this.reviewCount = reviewCount;
		this.averageRating = averageRating;
	}

}
