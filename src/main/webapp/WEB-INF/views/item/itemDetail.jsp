<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Detail</title>
<script src="/resources/js/item.js"></script>
</head>
<body>
	<h2>Item Detail</h2>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<form action="update" method="post" enctype="multipart/form-data">
		<table>
		<c:set var="i" value="${requestScope.itemDetail}" />
		<c:if test="${not empty requestScope.itemDetail}">
			<tr height="40">
				<th bgcolor="aqua">상품 번호</th>
				<td>${i.item_no}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">아이템 카테고리</th>
				<td>${i.item_category}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이름</th>
				<td>${i.item_name}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 가격</th>
				<td>${i.item_price}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">사이즈 선택</th>
				<td>${i.options_size}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">컬러 선택</th>
				<td>${i.options_color}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 설명</th>
				<td>${i.item_desc}</td>
			</tr>

			<tr height="40">
				<th bgcolor="aqua">할인율 설정</th>
				<td>${i.item_discount_rate}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">재고 수량</th>
				<td>${i.item_stock}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">등록일</th>
				<td>${i.regdate}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">판매 수량</th>
				<td>${i.item_sales_volume}</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">대표사진1</th>
				<td>
					<img src="/${i.item_img1}" class="select_img" width="100" height="100"><br> 
				</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">대표사진2</th>
				<td>
					<img src="/${i.item_img2}" class="select_img" width="100" height="100"><br> 
				</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">기타 상품 사진</th>
				<td>
					<c:forEach var="img" items="${requestScope.itemImages}" >
						<img src="/${img.item_img}" class="select_img" width="100" height="100">					
					</c:forEach>
				</td>
			</tr>
			
			<tr height="40">
				<th></th>
				<td><span onclick="itemUpdate(${i.item_no})">상품 수정</span></td>
			</tr>
			</c:if>
		</table>
	</form>

	<br>


	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>