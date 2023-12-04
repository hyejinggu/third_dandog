<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>home</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/itemAdmin.css">
<!-- <link rel="stylesheet" type="text/css" href="/resources/css/qnaAdmin.css"> -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/js/memberList.js"></script>
<script src="/resources/js/item.js"></script>
<script src="/resources/js/orders.js"></script>
<script src="/resources/js/board.js"></script>
<script src="/resources/js/community.js"></script>
<script src="/resources/js/code.js"></script>

</head>

<body>
	<h2>관리자 페이지</h2>
	<div class="adminPageHeader">
		<ul>
			<li>
				<p class="textlink" onclick="getItemList()">상품 관리</p> 
				<span onclick="getItemList()">상품 목록</span> 
				<span onclick="getItemInsert()">상품	등록</span>
				<span onclick="getcodeList()">코드 추가</span>
			<li>
				<p class="textlink" onclick="getAdminOrder()">주문 관리</p>
			</li>
			<li>
				<p class="textlink" onclick="getMemberList()">회원 관리</p>
			</li>
			<li>
				<p class="textlink" onclick="getAdminBoard()">고객센터 관리</p>
			</li>
			<li>
				<p class="textlink" onclick="getAdminCommunity()">커뮤니티 관리</p>
				<span onclick="getLoungeList()">라운지</span> 
				<span onclick="getEventList()">이벤트</span>
				<span onclick="getNeighborList()">우리 동네</span>
			</li>
		</ul>
	</div>

	<div id="resultArea1">관리자 페이지 입니다</div>
	<div id="resultArea2"></div>

</body>

</html>