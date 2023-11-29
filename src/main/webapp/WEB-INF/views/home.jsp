<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

		<!DOCTYPE html>
		<html>

		<head>
			<meta charset="UTF-8">
			<title>home</title>
			<link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
			<!-- <link rel="stylesheet" type="text/css" href="/resources/css/qnaAdmin.css"> -->
			<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
			<script type="module" src="/resources/js/memberList.js"></script>
			<script src="/resources/js/item.js"></script>
			<script src="/resources/js/orders.js"></script>
			<script src="/resources/js/board.js"></script>
			<script src="/resources/js/community.js"></script>

		</head>

		<body>
			<h2>관리자 페이지</h2>
			<div class="adminPageHeader">
				<ul>
					<li>
						<p class="textlink" onclick="getAdminItem()">상품 관리</p>
					</li>
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
					</li>
				</ul>
			</div>
			<div id="resultArea1"></div>
			<div id="resultArea2"></div>

		</body>

		</html>