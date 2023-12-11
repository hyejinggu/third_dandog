<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Insert</title>
<link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
</head>
<body>
	<div class="title">
		<h2>상품 관리</h2>
		<h3>Item Insert</h3>
	</div>
	<form action="/item/insert" method="post" enctype="multipart/form-data">
		<table class="item_table">
			<tr>
				<th>아이템 카테고리</th>
				<td><select name="item_category">
						<option value="Snack">간식, 사료</option>
						<option value="Toy">장난감</option>
						<option value="Living">리빙, 패션</option>
						<option value="Stroll">산책, 케어</option>
				</select></td>
			</tr>
			<tr>
				<th>상품 이름</th>
				<td><input type="text" id="item_name" name="item_name"
					placeholder="50자 이하"></td>
			</tr>
			<tr>
				<th>상품 가격</th>
				<td><input type="text" id="item_price" name="item_price"
					placeholder="숫자만 입력"><br></td>
			</tr>
			<tr>
				<th>사이즈 선택</th>
				<td><select name="options_sizes" multiple>
						<c:forEach var="s" items="${requestScope.itemSizes}">
							<option ${s == 'F' ? 'selected' : ''} value="${s}"> ${s} </option>
						</c:forEach>
				</select></td>
			</tr>
			<tr>
				<th>컬러 선택</th>
				<td><select name="options_colors" multiple>
						<c:forEach var="c" items="${requestScope.itemColors}">
							<option ${c == 'OneColor' ? 'selected' : ''} value="${c}"> ${c} </option>
						</c:forEach>
				</select></td>
			</tr>
			<tr>
				<th>상품 설명</th>
				<td><textarea cols="50" rows="10" name="item_desc"
						placeholder="500자 이하"></textarea></td>
			</tr>

			<tr>
				<th>할인율 설정</th>
				<td><input type="text" name="item_discount_rate"
					placeholder="숫자로만 입력"></td>
			</tr>
			<tr>
				<th>재고 수량</th>
				<td><input type="text" id="item_stock" name="item_stock"
					placeholder="숫자로만 입력"><br></td>
			</tr>
			<tr>
				<th>상품 이미지1</th>
				<td><img src="" class="select_img"><br> <input
					type="file" name="uploadfileF1" id="uploadfileF1" size="20">
				</td>
			</tr>
			<tr>
				<th>상품 이미지2</th>
				<td><img src="" class="select_img"><br> <input
					type="file" name="uploadfileF2" id="uploadfileF2" size="20">
				</td>
			</tr>
			<!-- 추가 상품 이미지 -->
			<tr>
				<th>상품 이미지3</th>
				<td>
					<img src="" class="select_img"><br> 
					<input type="file" name="etcImages" id="etcImages" multiple></td>
			</tr>

			<tr>
				<th></th>
				<td>
					<input type="reset" value="취소">
					<input type="submit" value="상품 등록">
				</td>
			</tr>
		</table>
	</form>

	<br>
	<br>
	<c:if test="${not empty requestScope.message}">
		=> ${requestScope.message}
	</c:if>

	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>