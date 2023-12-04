package com.i4.dandog.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.i4.dandog.entity.Code;
import com.i4.dandog.service.CodeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/code")
@Log4j2 // @Log4j -> Boot 에서는 2015년 이후 지원중단
@AllArgsConstructor
public class CodeController {

	CodeService service;
	
	@GetMapping("/codeList")
	public void codeList(Model model) {
		model.addAttribute("codeList", service.selectList());
	}
	
	@GetMapping("/codeInsert")
	public void codeInsert(Model model) {
	    List<String> codeNames = service.selectCodeName();
	    log.info("************************" + codeNames);
	    model.addAttribute("codeNames", codeNames);
	}
	
	@PostMapping("/insert")
	public String insert(Code entity, Model model) {
	    String new_code = entity.getNew_code_name();
	    if (new_code != null && !new_code.isEmpty()) {
	        entity.setCode_name(new_code);
	    }

	    String uri = "/code/codeList";
	    service.save(entity);
	    return uri;
	}
	
	
	@GetMapping("/delete")
	public String delete(Model model, @RequestParam(name = "code_seq") int code_seq) {
		service.deleteById(code_seq);
		return "/code/codeList";
	}
	
	
	

}
