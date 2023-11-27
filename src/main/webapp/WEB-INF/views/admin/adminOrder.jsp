<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 관리자 페이지</title>
</head>
<body>

	<h2>주문 목록</h2>

	<hr>
	<table border="1" style="width: 90%">
		<tr>
			<th>주문일</th>
			<th>주문번호</th>
			<th>배송 상태</th>
			<th>삭제</th>
		</tr>
		<c:forEach var="order" items="${requestScope.orders}">
			<tr>
				<td>${order.regdate}</td>
				<td><a
					href="orderdetail?order_detail_no=${order.order_detail_no}">${order.order_detail_no}</a></td>
				<td>${order.order_state}</td>
				<td><a
					href="orderdelete?order_detail_no=${order.order_detail_no}">삭제</a></td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>