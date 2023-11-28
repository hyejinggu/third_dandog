<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>home</title>
<link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/js/item.js"></script>
</head>
<body>
	<h2>관리자 페이지</h2>
	<div class="adminPageHeader">
		<ul>
			<li><p class="textlink" onclick="getAdminItem()">상품 관리</p></li>
			<li><p>주문 관리</p></li>
			<li><p>회원 관리</p></li>
			<li><p>고객센터 관리</p></li>
			<li><p>커뮤니티 관리</p></li>
		</ul>
	</div>
	<div id="resultArea1"></div>
	<div id="resultArea2"></div>

</body>
</html>