<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item List</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/itemAdmin.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/js/item.js"></script>
</head>
<body>
<%-- 	<%@ include file="../header.jsp"%> --%>
	<div class="adminItemContainer">
		<h2>상품 관리</h2>
<!-- 		<ul>
			<li><p onclick="getItemList()">상품 목록</p></li>
			<li><p onclick="getItemInsert()">상품 등록</p></li>
		</ul> -->
	</div>
	<h2>Item List</h2>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<form action="/item/itemList" method="get">
		<select name="search_category">
			<option value="all">전체</option>
			<option value="Snk">간식, 사료</option>
			<option value="Toy">장난감</option>
			<option value="Liv">리빙, 패션</option>
			<option value="Str">산책, 케어</option>
		</select> <select name="search_feild">
			<option value="name">상품 이름</option>
			<option value="no">상품 번호</option>
		</select> <input name="search_value" placeholder="검색어 입력" /> <input
			type="submit" value="검색" onclick="searchList()" />
	</form>
	<table class="item_table">
		<tr>
			<th>삭제</th>
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
			<%-- </c:if> --%>
		</tr>
		<c:if test="${not empty requestScope.itemList}">
			<c:forEach var="i" items="${requestScope.itemList}">
				<tr>
					<td><input type="checkbox" name="selectedItem"
						value="${i.item_no}" /></td>
					<td>${i.item_no}</td>
					<td>${i.item_category}</td>
					<td onclick="getItemDetail(${i.item_no})">${i.item_name}</td>
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

					<td><c:forEach var="img" items="${requestScope.itemImgList}">
							<c:if test="${i.item_no == img.item_no}">
								<img alt="itemImages" src="/${img.item_img}" width="50"
									height="70">
							</c:if>
						</c:forEach></td>

					<td>${i.regdate.year}-${i.regdate.monthValue}-${i.regdate.dayOfMonth}</td>
					<%-- <td>${i.item_stock}</td> --%>
					<%-- <td><a href="itemdelete?item_no=${i.item_no}">삭제</a></td> --%>
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
	<div>
		<input type="checkbox" id="selectall" value='selectall'
			onclick='selectAll(this)' /> <label for="selectall">전체 선택</label>
	</div>
	<input type="submit" value="delete_item" onclick="deleteItem()"/>

	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>