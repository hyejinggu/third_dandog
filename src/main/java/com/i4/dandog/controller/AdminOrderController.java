package com.i4.dandog.controller;


import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.i4.dandog.entity.OrderDetail;
import com.i4.dandog.service.OrderDetailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminOrderController {
    private OrderDetailService orderDetailService;

    // 주문 목록 조회
    @GetMapping("/orders")
    public String getOrderList(Model model) {
        model.addAttribute("orders", orderDetailService.getAllOrders());
        return "admin/adminOrder";
    }
    
    @GetMapping(value = "/orderdetail")
    public String orderdetail(Model model, OrderDetail entity) {
    	model.addAttribute("orderselect", orderDetailService.selectOne(entity.getOrder_detail_no()));
    	return "admin/adminOrderDetail";
    }
    
	@PostMapping(value="/orderupdate")
	public String orderUpdte(OrderDetail entity, Model model) throws IOException {
		model.addAttribute("orderselect", entity);
		String uri="redirect:orders";
		try {
			orderDetailService.updateOrderState(entity.getOrder_detail_no(), entity.getOrder_state());
			log.info("배송정보 수정 성공");
			model.addAttribute("message", "배송정보 수정 성공");
		} catch (Exception e) {
			log.info("** update Exception => "+e.toString());
			model.addAttribute("message", "배송정보 수정 실패 !! 다시 하세요 ~~");
			uri="admin/adminOrderDetail";
		}
		return uri;
	}
	
	@GetMapping(value="/orderdelete")
	public String mdelete(HttpSession session, OrderDetail entity) {
		
		String uri = "redirect:orders";
		
		try {
			orderDetailService.delete(entity.getOrder_detail_no());
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
		}
		
		return uri;
	} // mdelete
}
