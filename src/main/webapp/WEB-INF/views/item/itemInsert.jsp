<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Insert</title>
</head>
<body>
	<h2>Item Insert Form</h2>
	<form action="insert" method="post" enctype="multipart/form-data">
		<table>
			<tr height="40">
				<th bgcolor="aqua">아이템 카테고리</th>
				<td><select name="item_category">
						<option value="Snk">간식, 사료</option>
						<option value="Toy">장난감</option>
						<option value="Liv">리빙, 패션</option>
						<option value="Str">산책, 케어</option>
				</select></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이름</th>
				<td><input type="text" id="item_name" name="item_name"
					placeholder="50자 이하"></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 가격</th>
				<td><input type="text" id="item_price" name="item_price"
					placeholder="숫자만 입력"><br></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">사이즈 선택</th>
				<td><select name="options_size">
						<option value="F">Free</option>
						<option value="S">S</option>
						<option value="M">M</option>
						<option value="L">L</option>
				</select></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">컬러 선택</th>
				<td><select name="options_color">
						<option value="Bk">Black</option>
						<option value="Wh">White</option>
						<option value="Gr">Gray</option>
						<option value="Bl">Blue</option>
						<option value="Rd">Red</option>
						<option value="Ye">Yellow</option>
						<option value="Gr">Green</option>
						<option value="Or">Orange</option>
						<option value="Br">Brown</option>
						<option value="Pk">Pink</option>
				</select></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 설명</th>
				<td><textarea cols="50" rows="10" name="item_desc"
						placeholder="500자 이하"></textarea></td>
			</tr>

			<tr height="40">
				<th bgcolor="aqua">할인율 설정</th>
				<td><input type="text" name="item_discount_rate"
					placeholder="숫자로만 입력"></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">재고 수량</th>
				<td><input type="text" id="item_stock" name="item_stock"
					placeholder="숫자로만 입력"><br></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이미지1</th>
				<td><img src="" class="select_img"><br> <input
					type="file" name="uploadfileF1" id="uploadfileF1" size="20">
				</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이미지2</th>
				<td><img src="" class="select_img"><br> <input
					type="file" name="uploadfileF2" id="uploadfileF2" size="20">
				</td>
			</tr>
			<tr height="40">
				<th></th>
				<td><input type="reset" value="취소">&nbsp;&nbsp; <input
					type="submit" value="상품 등록">&nbsp;&nbsp;</td>
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