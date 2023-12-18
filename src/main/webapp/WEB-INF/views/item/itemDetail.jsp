<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Detail</title>
<link rel="stylesheet" type="text/css" href="/resources/css/commonAdmin.css">
<link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
<script src="/resources/js/item.js"></script>
</head>
<body>
	<div class="title">
    	<h2>상품 관리</h2>
		<h3>Item Detail</h3>
	</div>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<form action="update" method="post" enctype="multipart/form-data">
		<table class="table item_update">
		<c:set var="i" value="${requestScope.itemDetail}" />
		<c:if test="${not empty requestScope.itemDetail}">
			<tr>
				<th>상품 번호</th>
				<td>${i.item_no}</td>
			</tr>
			<tr>
				<th>아이템 카테고리</th>
				<td>${i.item_category}</td>
			</tr>
			<tr>
				<th>상품 이름</th>
				<td>${i.item_name}</td>
			</tr>
			<tr>
				<th>상품 가격</th>
				<td>${i.item_price}</td>
			</tr>
			<tr >
				<th >사이즈 선택</th>
				<td>${i.options_size}</td>
			</tr>
			<tr>
				<th>컬러 선택</th>
				<td>${i.options_color}</td>
			</tr>
			<tr>
				<th >상품 설명</th>
				<td>${i.item_desc}</td>
			</tr>

			<tr>
				<th>할인율 설정</th>
				<td>${i.item_discount_rate}</td>
			</tr>
			<tr>
				<th>재고 수량</th>
				<td>${i.item_stock}</td>
			</tr>
			<tr>
				<th>등록일</th>
				<td>${i.regdate}</td>
			</tr>
			<tr>
				<th>판매 수량</th>
				<td>${i.item_sales_volume}</td>
			</tr>
			<tr>
				<th >대표사진1</th>
				<c:if test="${not empty i.item_img1}">
					<td>
						<img src="/resources/images/item/${i.item_img1}" class="select_img" width="100" height="100"><br> 
					</td>
				</c:if>
			</tr>
			<tr >
				<th>대표사진2</th>
				<c:if test="${not empty i.item_img2}">
					<td>
						<img src="/resources/images/item/${i.item_img2}" class="select_img" width="100" height="100"><br> 
					</td>
				</c:if>
			</tr>
			<tr >
				<th >기타 상품 사진</th>
				<td>
					<c:forEach var="img" items="${requestScope.itemImages}" >
						<img src="/resources/images/item/${img.item_img}" class="select_img" width="100" height="100">					
					</c:forEach>
				</td>
			</tr>
			
			</c:if>
		</table>
		<div class="item_btn">
			<span onclick="itemUpdate(`${i.item_no}`)">상품 수정</span>
		</div>
	</form>

	<br>



</body>
</html>