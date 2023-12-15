<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Update</title>
<link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
<link rel="stylesheet" type="text/css" href="/resources/css/commonAdmin.css">
</head>
<body>
	<div class="title">
	    <h2>상품 관리</h2>
		<h3>Item Update</h3>
	</div>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<form action="/item/update" method="post" enctype="multipart/form-data" id="item_update_form" >
		<table class="table item_update">
		<c:set var="i" value="${requestScope.itemDetail}" />
		<c:if test="${not empty requestScope.itemDetail}">
			<tr>
				<th>상품 번호</th>
				<td><input type="text" value="${i.item_no}" name="item_no" readonly></td>
				<th>아이템 카테고리</th>
				<td><select name="item_category">
						<option ${i.item_category == "Snack" ? "selected" : ""} value="Snack">간식, 사료</option>
						<option ${i.item_category == "Toy" ? "selected" : ""} value="Toy">장난감</option>
						<option ${i.item_category == "Living" ? "selected" : ""} value="Living">리빙, 패션</option>
						<option ${i.item_category == "Stroll" ? "selected" : ""} value="Stroll">산책, 케어</option>
				</select></td>
			</tr>
			<tr>
				<th>상품 이름</th>
				<td><input type="text" id="item_name" name="item_name" value="${i.item_name}"
					placeholder="50자 이하"></td>
				<th>등록일</th>
				<td colspan="3" ><input type="text" id="regdate" name="regdate" value="${i.regdate}" readonly ><br></td>
				
			</tr>
			<tr>
				<th>사이즈, 컬러 선택</th>
				<td colspan="3">
					<select name="options_size">
						<c:forEach var="s" items="${requestScope.itemSizes}">
							<option ${s == i.options_size ? 'selected' : ''} value="${s}"> ${s} </option>
						</c:forEach>
					</select>
					<select name="options_color">
						<c:forEach var="c" items="${requestScope.itemColors}">
							<option ${c == i.options_color ? 'selected' : ''} value="${c}"> ${c} </option>
						</c:forEach>
					</select>
				</td>
			</tr>
			
			<tr>
				<th>상품 가격</th>
				<td><input type="text" id="item_price" name="item_price" value="${i.item_price}"
					placeholder="숫자만 입력">원</td>
				<th>할인율 설정</th>
				<td><input type="text" name="item_discount_rate" value="${i.item_discount_rate}"
					placeholder="숫자로만 입력">%</td>
			</tr>
			<tr>
				<th>재고 수량</th>
				<td><input type="text" id="item_stock" name="item_stock" value="${i.item_stock}"
					placeholder="숫자로만 입력"></td>
				<th>판매 수량</th>
				<td><input type="text" id="item_sales_volume" name="item_sales_volume" value="${i.item_sales_volume}" readonly><br></td>
			</tr>
			<tr>
				<th>상품 설명</th>
				<td colspan="3" >
					<textarea cols="50" rows="5" name="item_desc" placeholder="500자 이하">${i.item_desc}</textarea>
				</td>
			</tr>
			<tr>
				<th>상품 이미지</th>
				<td colspan="3">
					<div>
						<img src="/${i.item_img1}" class="select_img" width="100" height="100">
						<input type="hidden" name="item_img1" value="${i.item_img1}">
						<input type="file" name="uploadfileF1" id="uploadfileF1" size="20">
					</div>
					<div>
						<img src="/${i.item_img2}" class="select_img" width="100" height="100"> 
						<input type="hidden" name="item_img2" value="${i.item_img2}">
						<input type="file" name="uploadfileF2" id="uploadfileF2" size="20">
					</div>
				</td>
			</tr>
			<tr>
				<th>기타 상품 사진</th>
			    <td colspan="3">
				    <div>
				        <!-- 기존 이미지 표시 -->
				        <div>
				        <c:forEach var="img" items="${requestScope.itemImages}">
				            <input id="selectedImages" type="checkbox" name="selectedImages" value="${img.image_no}">
				        	<label for="selectedImages">
				            	<img src="/${img.item_img}" class="select_img" width="100" height="100">
				            	<input type="hidden" name="item_img" value="${img.item_img}">
				            </label>
				            
				            <!-- 이미지 수정을 위한 체크박스 -->
				        </c:forEach>
				        </div>
						<span>선택한 이미지만 업로드됩니다.</span>
					</div>
			        <!-- 수정된 이미지 업로드를 위한 파일 입력 -->
			        <input type="file" name="etcImages" id="etcImages" multiple>
			    </td>
			</tr>
			
			<tr>
				<th></th>
				<td colspan="3">
					<input type="reset" value="취소"> 
					<input type="submit" value="상품 수정" onclick="updateItem()">
				</td>
			</tr>
			</c:if>
		</table>
	</form>



</body>
</html>