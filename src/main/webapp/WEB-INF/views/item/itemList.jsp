<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item List</title>
<link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/js/item.js"></script>
</head>
<body>
	<div class="adminItemContainer">
		<h2>상품 관리</h2>
		<ul>
			<li><p onclick="getAdminItem()">상품 목록</p></li>
			<li><p onclick="getItemInsert()">상품 등록</p></li>
		</ul>
	</div>
	<h2>Item List</h2>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<table class="item_table">
		<tr>
			<th>번호</th>
			<th>카테고리</th>
			<th>이름</th>
			<th>가격</th>
			<th>사이즈</th>
			<th>컬러</th>
			<!-- <th>상품 설명</th> -->
			<th>판매 수량</th>
			<th>할인율</th>
			<th>대표사진1</th>
			<th>대표사진2</th>
			<th>기타 상품 사진</th>
			<th>등록일</th>
			<!-- <th>재고</th> -->
			<!-- 관리자 기능 추가 -->
			<%-- <c:if test="${sessionScope.loginID == 'admin'}"> --%>
			<th>Update</th>
			<th>Delete</th>
			<%-- </c:if> --%>
		</tr>
		<c:if test="${not empty requestScope.itemList}">
			<c:forEach var="i" items="${requestScope.itemList}">
				<tr>
					<td>${i.item_no}</td>
					<td>${i.item_category}</td>
					<td onclick = "getItemDetail(${i.item_no})">${i.item_name}</td>
					<td>${i.item_price}원</td>
					<td>${i.options_size}</td>
					<td>${i.options_color}</td>
					<%-- <td>${i.item_desc}</td> --%>
					<td>${i.item_sales_volume}</td>
					<td>${i.item_discount_rate}%</td>
					<!-- Image 추가 -->
					<td><img alt="itemImage1" src="/${i.item_img1}" width="50"
						height="70"></td>
					<td><img alt="itemImage2" src="/${i.item_img2}" width="50"
						height="70"></td>
						
					<td>
						<c:forEach var="img" items="${requestScope.itemImgList}">
							<c:if test="${i.item_no == img.item_no}">
									<img alt="itemImages" src="/${img.item_img}" width="50" height="70">
							</c:if>
						</c:forEach>
					</td>					

					<td>${i.regdate.year}-${i.regdate.monthValue}-${i.regdate.dayOfMonth}</td>
					<%-- <td>${i.item_stock}</td> --%>
					<!-- 관리자 기능 추가 -->
					<%-- <c:if test="${sessionScope.loginID == 'admin'}"> --%>
					<td><a href="itemupdate?item_no=${i.item_no}">수정</a></td>
					<td><a href="itemdelete?item_no=${i.item_no}">삭제</a></td>
					<%-- </c:if> --%>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.itemList}">
			<tr>
				<td colspan="13">출력할 데이터가 없습니다.</td>
			</tr>
		</c:if>
	</table>

	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>