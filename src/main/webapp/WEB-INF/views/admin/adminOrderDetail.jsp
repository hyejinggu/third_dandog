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
<script src="/resources/js/orders.js"></script>
</head>
<body>
	<div class="title">
    	<h2>주문 목록 상세</h2>
		<h3>Item Detail</h3>
	</div>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
		<table class="table item_update">
		<%-- <c:set var="i" value="${requestScope.orderDetail}" /> --%>
		<c:if test="${not empty requestScope.orderDetail}">
		<c:forEach var="order" items="${requestScope.orderDetail}">
				<tr height="40">
					<th>주문상세번호</th>
					<td><input type="text" name="order_detail_no"
						value="${order.order_detail_no}" size="20" readonly="readonly"></td>
				</tr>
				
				<tr height="40">
					<th>주문번호</th>
					<td><input type="text" name="order_num"
						value="${order.order_num}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>상품번호</th>
					<td><input type="text" name="item_no"
						value="${order.item_no}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>주문수량</th>
					<td><input type="text" name="item_quantity"
						value="${order.item_quantity}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>상품가격</th>
					<td><input type="text" name="item_price"
						value="${order.item_price}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th bgcolor="Orange">리뷰상태</th>
					<td><input type="text" name="review_state"
						value="${order.review_state}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>옵션 사이즈</th>
					<td><input type="text" name="option_size"
						value="${order.option_size}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>옵션 컬러</th>
					<td><input type="text" name="option_color"
						value="${order.option_color}" size="20" disabled="disabled"></td>
				</tr>
		</c:forEach>
			</c:if>
		</table>

	<br>


				
				
				
</body>
</html>