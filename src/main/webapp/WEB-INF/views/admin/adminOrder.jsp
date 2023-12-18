<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 관리자 페이지</title>
<script src="/resources/js/orders.js"></script>
</head>
<body>
	<div class="title">
		<h2>주문 목록</h2>
		<h3>order List</h3>
	</div>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<div class="search_wrap">
		<form id="searchForm">
			<select id="i_search_delivery">
				<option value="all">전체</option>
				<c:forEach var="category"
					items="${fn:split('배송대기,배송중,배송완료', ',')}">
					<option value="${category}"
						${param.search_delivery == category ? "selected" : ""}>${category}</option>
				</c:forEach>
			</select>
			
			<select id="i_search_field">
				<option value="id" ${param.search_field == 'id' ? 'selected' : ''}>주문자ID</option>
				<option value="state"
					${param.search_field == 'state' ? 'selected' : ''}>결제상태</option>
			</select>
			
			<input placeholder="검색어 입력" id="i_search_value" value="${param.search_value}" />
			<input type="button" onclick="searchOrders()" value="적용" />
			<input type="reset"	value="취소" onclick="getAdminOrder()" />
		</form>
	</div>
	<table class="table item_list">
		<tr>
			<!-- 페이징 처리 추가 -->
			<th><label for="selectall">전체</label><br> <input
				type="checkbox" id="selectall" value='selectall'
				onclick='select_order(this)' /></th>
			<th>주문일</th>
			<th>주문번호</th>
			<th>주문자 id</th>
			<th>총 주문금액</th>
			<th>결제방법</th>
			<th>받는이</th>
			<th>받는이전화번호</th>
			<th>받는이주소</th>
			<th>배송 상태</th>
			<th>결제 상태</th>
		</tr>
		<c:if test="${not empty requestScope.orderList}">
			<c:forEach var="order" items="${requestScope.orderList}">
				<tr>
					<td><input type="checkbox" name="selectedItem"
						class="order_check" value="${order.order_num}" /></td>
					<td>${order.regdate}</td>
					<td onclick="getOrderDetail(`${order.order_num}`)">${order.order_num}</td>
					<td>${order.user_id}</td>
					<td>${order.total_price}</td>
					<td>${order.payment}</td>
					<td>${order.recipient_name}</td>
					<td>${order.recipient_phone}</td>
					<td>${order.user_address1}${order.user_address2}
						(${order.post_code})</td>
					<td>${order.order_state}
					<c:if test="${order.order_state == '배송대기'}">
						<input type="button" value="배송중변환" onclick="orderStateChange(${order.order_num})"/>
					</c:if>
					</td>
					<td>${order.pay_state}
					<c:if test="${order.pay_state == '입금대기'}">
						<input type="button" value="결제완료변환" onclick="payStateChange(${order.order_num})"/>
					</c:if>
					</td>
				</tr>
			</c:forEach>
		</c:if>
		<tr>
			<!-- 페이징 버튼 추가 -->
			<td colspan="13">
				<div class="pagination_wrap">
					<c:if test="${not empty requestScope.orderList}">
						<c:forEach var="pageNumber" begin="0"
							end="${empty requestScope.orderList ? 0 : requestScope.orderPage.totalPages - 1}">
							<span onclick="searchOrders(`${pageNumber}`)"
								class="${pageNumber == requestScope.orderPage.number ? 'currentPage' : ''}">
								${pageNumber + 1} </span>
						</c:forEach>
					</c:if> 
				</div>
			</td>
		</tr>
		<c:if test="${empty requestScope.orderList}">
			<tr>
				<td colspan="13">출력할 데이터가 없습니다.</td>
			</tr>
		</c:if>
	</table>

	<input type="submit" value="선택 삭제" onclick="deleteOrder()" />

	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>