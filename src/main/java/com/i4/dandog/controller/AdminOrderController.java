package com.i4.dandog.controller;


import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.i4.dandog.entity.ItemOrder;
import com.i4.dandog.entity.OrderDetail;
import com.i4.dandog.service.ItemOrderService;
import com.i4.dandog.service.OrderDetailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminOrderController {
	private ItemOrderService itemOrderService;
    private OrderDetailService orderDetailService;

    // 주문 목록 조회
//    @GetMapping(value = "/orders")
//    public String getOrderList(Model model) {
//        model.addAttribute("orders", itemOrderService.getAllOrders());
//    }
	@GetMapping("/orders")
	public String orderList(
	        @RequestParam(name = "search_Delivery", defaultValue = "all") String searchDelivery,
	        @RequestParam(name = "search_field", defaultValue = "state") String searchField,
	        @RequestParam(name = "search_value", defaultValue = "") String searchValue,
	        @RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size,
	        Model model) {

	    if (searchDelivery.equals("all")) {
	        searchDelivery = null;
	    }

	    // 페이지네이션을 위해 Pageable 객체 생성
	    Pageable pageable = PageRequest.of(page, size);

	    Page<ItemOrder> orderPage;

	    if ("id".equals(searchField)) {
	        orderPage = itemOrderService.findByDeliveryUserId(searchDelivery, searchValue, pageable);
	    } else {
	    	orderPage = itemOrderService.findByDeliveryPayState(searchDelivery, searchValue, pageable);
	    }

	    model.addAttribute("orderList", orderPage.getContent());

	    // 페이지 관련 정보를 모델에 추가
	    model.addAttribute("orderPage", orderPage);
	    model.addAttribute("currentPage", orderPage.getNumber());
	    model.addAttribute("totalPages", orderPage.getTotalPages());
	    model.addAttribute("totalItems", orderPage.getTotalElements());

	    return "admin/adminOrder";
	}
    
    @GetMapping(value = "/orderdetail")
    public String orderdetail(Model model, OrderDetail entity) {
    	model.addAttribute("orderselect", orderDetailService.selectOne(entity.getOrder_detail_no()));
    	return "admin/adminOrderDetail";
    }
    
//	@PostMapping(value="/orderupdate")
//	public String orderUpdte(OrderDetail entity, Model model) throws IOException {
//		model.addAttribute("orderselect", entity);
//		String uri="redirect:orders";
//		try {
//			orderDetailService.updateOrderState(entity.getOrder_detail_no(), entity.get());
//			log.info("배송정보 수정 성공");
//			model.addAttribute("message", "배송정보 수정 성공");
//		} catch (Exception e) {
//			log.info("** update Exception => "+e.toString());
//			model.addAttribute("message", "배송정보 수정 실패 !! 다시 하세요 ~~");
//			uri="admin/adminOrderDetail";
//		}
//		return uri;
//	}
//	
//	@GetMapping(value="/orderdelete")
//	public String mdelete(HttpSession session, OrderDetail entity) {
//		
//		String uri = "redirect:orders";
//		
//		try {
//			orderDetailService.delete(entity.getOrder_detail_no());
//		} catch (Exception e) {
//			log.info("** delete Exception => "+e.toString());
//		}
//		
//		return uri;
//	} // mdelete
}
