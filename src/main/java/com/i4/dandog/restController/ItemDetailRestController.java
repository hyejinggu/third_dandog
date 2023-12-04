package com.i4.dandog.restController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.ItemImage;
import com.i4.dandog.entity.ItemInfoImage;
import com.i4.dandog.repository.ItemImageRepository;
import com.i4.dandog.repository.ItemInfoImageRepository;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/itemdetail")
@Log4j2
@AllArgsConstructor
public class ItemDetailRestController {
	private final ItemInfoImageRepository itemInfoImageRepository;
	private final ItemImageRepository itemImageRepository;
	
	@GetMapping("/getImageData")
	public List<ItemImage> imageList(){
	    List<ItemImage> imageList  = itemImageRepository.findAll();
	    return imageList;
	}
	
    @GetMapping("/getInfoImageData")
    public List<ItemInfoImage> selectList() {
        List<ItemInfoImage> itemInfoImageList = itemInfoImageRepository.findAll();
        return itemInfoImageList;
    }


}
