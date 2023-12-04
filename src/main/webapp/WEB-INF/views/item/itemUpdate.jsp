<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Update</title>
</head>
<body>
	<h2>Item Update Form (수정 페이지!!)</h2>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<form action="/item/update" method="post" enctype="multipart/form-data">
		<table>
		<c:set var="i" value="${requestScope.itemDetail}" />
		<c:if test="${not empty requestScope.itemDetail}">
			<tr height="40">
				<th bgcolor="aqua">상품 번호</th>
				<td><input type="text" value="${i.item_no}" name="item_no" readonly></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">아이템 카테고리</th>
				<td><select name="item_category">
						<option ${i.item_category == "Snk" ? "selected" : ""} value="Snk">간식, 사료</option>
						<option ${i.item_category == "Toy" ? "selected" : ""} value="Toy">장난감</option>
						<option ${i.item_category == "Liv" ? "selected" : ""} value="Liv">리빙, 패션</option>
						<option ${i.item_category == "Str" ? "selected" : ""} value="Str">산책, 케어</option>
				</select></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이름</th>
				<td><input type="text" id="item_name" name="item_name" value="${i.item_name}"
					placeholder="50자 이하"></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 가격</th>
				<td><input type="text" id="item_price" name="item_price" value="${i.item_price}"
					placeholder="숫자만 입력"><br></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">사이즈 선택</th>
				<td><select name="options_size">
						<option ${i.options_size == "F" ? "selected" : ""} value="F">Free</option>
						<option ${i.options_size == "S" ? "selected" : ""} value="S">S</option>
						<option ${i.options_size == "M" ? "selected" : ""} value="M">M</option>
						<option ${i.options_size == "L" ? "selected" : ""} value="L">L</option>
				</select></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">컬러 선택</th>
				<td><select name="options_color">
						<option ${i.options_color == "Bk" ? "selected" : ""} value="Bk">Black</option>
						<option ${i.options_color == "Wh" ? "selected" : ""} value="Wh">White</option>
						<option ${i.options_color == "Gr" ? "selected" : ""} value="Gr">Gray</option>
						<option ${i.options_color == "Bl" ? "selected" : ""} value="Bl">Blue</option>
						<option ${i.options_color == "Rd" ? "selected" : ""} value="Rd">Red</option>
						<option ${i.options_color == "Ye" ? "selected" : ""} value="Ye">Yellow</option>
						<option ${i.options_color == "Gr" ? "selected" : ""} value="Gr">Green</option>
						<option ${i.options_color == "Or" ? "selected" : ""} value="Or">Orange</option>
						<option ${i.options_color == "Br" ? "selected" : ""} value="Br">Brown</option>
						<option ${i.options_color == "Pk" ? "selected" : ""} value="Pk">Pink</option>
				</select></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 설명</th>
				<td><textarea cols="50" rows="10" name="item_desc" placeholder="500자 이하">${i.item_desc}</textarea></td>
			</tr>

			<tr height="40">
				<th bgcolor="aqua">할인율 설정</th>
				<td><input type="text" name="item_discount_rate" value="${i.item_discount_rate}"
					placeholder="숫자로만 입력"></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">재고 수량</th>
				<td><input type="text" id="item_stock" name="item_stock" value="${i.item_stock}"
					placeholder="숫자로만 입력"><br></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">등록일</th>
				<td><input type="text" id="regdate" name="regdate" value="${i.regdate}" readonly ><br></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">판매 수량</th>
				<td><input type="text" id="item_sales_volume" name="item_sales_volume" value="${i.item_sales_volume}" readonly><br></td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이미지1</th>
				<td>
					<img src="/${i.item_img1}" class="select_img" width="100" height="100"><br> 
					<input type="hidden" name="item_img1" value="${i.item_img1}"><br>
					<input type="file" name="uploadfileF1" id="uploadfileF1" size="20">
				</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">상품 이미지2</th>
				<td>
					<img src="/${i.item_img2}" class="select_img" width="100" height="100"><br> 
					<input type="hidden" name="item_img2" value="${i.item_img2}"><br>
					<input type="file" name="uploadfileF2" id="uploadfileF2" size="20">
				</td>
			</tr>
			<tr height="40">
				<th bgcolor="aqua">기타 상품 사진</th>
			    <td>
			        <!-- 기존 이미지 표시 -->
			        <c:forEach var="img" items="${requestScope.itemImages}">
			            <img src="/${img.item_img}" class="select_img" width="100" height="100"><br>
			            
			            <!-- 이미지 수정을 위한 체크박스 -->
			            <input type="checkbox" name="selectedImages" value="${img.item_img}">
			            <label for="selectedImages">삭제할 이미지 선택</label>
			            <br>
			        </c:forEach>
			
			        <!-- 수정된 이미지 업로드를 위한 파일 입력 -->
			        <input type="file" name="etcImages" id="etcImages" multiple>
			    </td>
			</tr>
			
			<tr height="40">
				<th></th>
				<td><input type="reset" value="취소">&nbsp;&nbsp; <input
					type="submit" value="상품 수정">&nbsp;&nbsp;</td>
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