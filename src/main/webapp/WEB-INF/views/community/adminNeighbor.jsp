<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/itemAdmin.css">
</head>
<body>
	<div class="adminPageWrap">

		<h2 class="title">관리자 페이지</h2>
		<div class="adminPageHeader">
			<ul>
				<li><a href="/item/itemList">상품 관리</a></li>
				<li><a>주문 관리</a></li>
				<li><a href="../member/memberList">회원 관리</a></li>
				<li><a>고객센터 관리</a></li>
				<li><a href="../community/adminLounge">커뮤니티 관리</a></li>
			</ul>
		</div>
		<div class="adminItemContainer">
			<h2>상품 관리</h2>
			<ul>
				<li><a href="/community/adminLounge">라운지 관리</a></li>
				<li><a href="/community/adminEvent">이벤트 관리</a></li>
				<li><a href="/community/adminNeighbor">우리동네 관리</a></li>
			</ul>
		</div>
		<h2>Lounge 글 목록</h2>
		<c:if test="${not empty requestScope.message}">
			<h3>${requestScope.message}</h3>
		</c:if>
		<table border="1" style="width: 100%">
			<tr bgcolor="pink">
				<th>번호</th>
				<th>작성자</th>
				<th>상호명</th>
				<th>제목</th>
				<th>내용</th>
				<th>별점</th>
				<th>등록일</th>
				<th>수정</th>
				<th>삭제</th>
			</tr>
			<c:if test="${not empty requestScope.NeighborList}">
				<c:forEach var="i" items="${requestScope.NeighborList}">
					<tr>
						<td>${i.neighbor_no}</td>
						<td>${i.user_id}</td>
						<td>${i.neighbor_brand_name}</td>
						<td>${i.neighbor_title}</td>
						<td>${i.neighbor_content}</td>
						<td>${i.neighbor_rating}</td>
						<td>${i.regdate.year}-${i.regdate.monthValue}-${i.regdate.dayOfMonth}</td>
						<%-- <td>${i.item_stock}</td> --%>
						<!-- 관리자 기능 추가 -->
						<%-- <c:if test="${sessionScope.loginID == 'admin'}"> --%>
						<td><a href="itemupdate?item_no=${i.neighbor_no}">수정</a></td>
						<td><a href="itemdelete?item_no=${i.neighbor_no}">삭제</a></td>
						<%-- </c:if> --%>
					</tr>
				</c:forEach>
			</c:if>
			<c:if test="${empty requestScope.NeighborList}">
				<tr>
					<td colspan="9">출력할 데이터가 없습니다.</td>
				</tr>
			</c:if>
		</table>

		<h4>
			<a href="/home">Home으로 가기</a>
		</h4>

	</div>
</body>
</html>