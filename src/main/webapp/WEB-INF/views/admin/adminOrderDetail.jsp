<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot JPA MemberUpdate **</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
</head>
<body>
	<h2>주문 목록 상세</h2>

	<form action="orderupdate" method="Post">
		<table border="1">
				<tr height="40">
					<th>주문상세번호</th>
					<td><input type="text" name="order_detail_no"
						value="${requestScope.orderselect.order_detail_no}" size="20" readonly="readonly"></td>
				</tr>
				
				<tr height="40">
					<th>주문번호</th>
					<td><input type="text" name="order_num"
						value="${requestScope.orderselect.order_num}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>상품번호</th>
					<td><input type="text" name="item_no"
						value="${requestScope.orderselect.item_no}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>주문수량</th>
					<td><input type="text" name="item_quantity"
						value="${requestScope.orderselect.item_quantity}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th>상품가격</th>
					<td><input type="text" name="item_price"
						value="${requestScope.orderselect.item_price}" size="20" disabled="disabled"></td>
				</tr>
				
				<tr height="40">
					<th bgcolor="Orange">배송상태</th>
					<td><select name="order_state">
							<option value="준비중" ${requestScope.orderselect.order_state=="준비중" ? "selected" : ""}>
								준비중</option>
							<option value="배송중" ${requestScope.orderselect.order_state=="배송중" ? "selected" : ""}>
								배송중</option>
							<option value="배송완료" ${requestScope.orderselect.order_state=="배송완료" ? "selected" : ""}>
								배송완료</option>
					</select></td>
				</tr>
				
				<tr height="40">
					<th>주문일</th>
					<td><input type="text" name="regdate"
						value="${requestScope.orderselect.regdate}" size="20" disabled="disabled"></td>
				</tr>


				<tr height="40">
					<th></th>
					<td><input type="submit" value="수정">&nbsp;&nbsp;&nbsp;
						<input type="reset" value="취소"></td>
				</tr>
		</table>
	</form>
</body>
</html>