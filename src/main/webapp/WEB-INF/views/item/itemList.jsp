<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item List</title>
</head>
<body>
	<h2>Item List</h2>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<table border="1" style="width: 80%">
		<tr bgcolor="pink">
			<th>번호</th>
			<th>카테고리</th>
			<th>이름</th>
			<th>가격</th>
			<th>사이즈</th>
			<th>컬러</th>
			<th>상품 설명</th>
			<th>판매 수량</th>
			<th>할인율</th>
			<th>사진1</th>
			<th>사진2</th>
			<th>등록일</th>
			<th>재고</th>
			<!-- 관리자 기능 추가 -->
			<%-- <c:if test="${sessionScope.loginID == 'admin'}"> --%>
			<th>Update</th>
			<th>Delete</th>
			<%-- </c:if> --%>
		</tr>
		<c:if test="${not empty requestScope.itemList}">
			<c:forEach var="i" items="${requestScope.itemList}">
				<tr>
					<td><a href="idetail?no=${i.item_no}">${i.item_no}</a></td>
					<td>${i.item_category}</td>
					<td>${i.item_name}</td>
					<td>${i.item_price}원</td>
					<td>${i.options_size}</td>
					<td>${i.options_color}</td>
					<td>${i.item_desc}</td>
					<td>${i.item_sales_volume}</td>
					<td>${i.item_discount_rate}%</td>
					<!-- Image 추가 -->
					<td><img alt="itemImage1" src="/${i.item_img1}" width="50"
						height="70"></td>
					<td><img alt="itemImage2" src="/${i.item_img2}" width="50"
						height="70"></td>

					<!-- 파일 다운로드 추가 
         				=> download 요청을 받으면 서버는 해당 파일을 찾아 response에 담아보내면, 웹브라우저가 받아 download 시켜줌 
         				=> 최종적 처리를 웹브라우저가 해주기 때문에 일반적으로 a Tag로 처리함     
           				  (즉, 비동기 처리_Ajax 를 하지 않음, 비동기 처리에서는 response를 웹브라우저가 받지 않기 때문 ) -->
					<%-- <td><a href="download?dnfile=${m.uploadfile}">${m.uploadfile}</a></td> --%>

					<td>${i.regdate}</td>
					<td>${i.item_stock}</td>
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