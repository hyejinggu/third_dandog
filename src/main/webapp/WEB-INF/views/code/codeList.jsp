<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item List</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/codeAdmin.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/js/code.js"></script>
</head>
<body>
<%-- 	<%@ include file="../header.jsp"%> --%>
	<div class="title">
		<h2>코드 관리</h2>
		<h3>Code List</h3>
	</div>
	<c:if test="${not empty requestScope.message}">
		<h3>${requestScope.message}</h3>
	</c:if>
	<table class="code_table">
		<tr>
			<th>코드 번호</th>
			<th>코드 이름</th>
			<th>코드 값</th>
			<th>삭제</th>
		</tr>
		<c:if test="${not empty requestScope.codeList}">
			<c:forEach var="i" items="${requestScope.codeList}">
				<tr>
					<td>${i.code_seq}</td>
					<td>${i.code_name}</td>
					<td>${i.code_value}</td>
					<td><input type="button" value="삭제" onclick="deleteCode(${i.code_seq})" /></td>
				</tr>
			</c:forEach>
		</c:if>
		<tr>
			<td></td>
			<td></td>
			<td colspan="2" >
				<input type="button" value="코드 추가하기" onclick="codeInsert()"/>
			</td>
		</tr>
		<c:if test="${empty requestScope.codeList}">
			<tr>
				<td colspan="3">출력할 데이터가 없습니다.</td>
			</tr>
		</c:if>
	</table>
	<div>
	</div>

	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>