package com.i4.dandog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "item")
@EqualsAndHashCode(callSuper=true)
// @EqualsAndHashCode(callSuper=false)를 사용하면 슈퍼클래스의 
// 필드들이 equals 및 hashCode에서 고려되지 않습니다. 
// 슈퍼클래스의 필드들도 고려되어야 하는 경우라면 @EqualsAndHashCode(callSuper=true)를 사용
@Data
@DynamicInsert
// @DynamicInsert를 사용해서 아예 null값이 되었을 때 쿼리문에서 제외되도록 해야, DDL에 설정한 default값으로 잘 들어가진다.
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int item_no;
	
	private String item_category;

	private String item_name;
	
	private int item_price;
	
	private String options_size;
	private String options_color;
	
	private String item_desc;
	
	private String item_img1;
	private String item_img2;
	
	// default 값이 0이어서 위에 @DynamicInsert 적용
	private int item_sales_volume;
	private int item_discount_rate;
	
	private int item_stock;
	
	
//    @OneToMany(targetEntity = ItemImage.class, cascade = CascadeType.ALL)
//    @JoinColumn(name = "item_no", referencedColumnName = "item_no")
//    private List<ItemImage> itemImages;
	
	
	
	@Transient // DB에는 따로 생성되지 않음
	private MultipartFile uploadfileF1; // form의 Upload_File 정보를 전달받기 위한 필드
	@Transient
	private MultipartFile uploadfileF2; // form의 Upload_File 정보를 전달받기 위한 필드
	
	
}
