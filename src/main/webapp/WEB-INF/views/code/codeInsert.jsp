<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Item Insert</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/codeAdmin.css">
<script src="/resources/js/code.js"></script>
</head>
<body>
	<div class="adminItemContainer">
		<h2>상품 관리</h2>
	</div>
	<h2>Item Insert Form</h2>
	<form action="/code/insert" method="post" id="code_insert_form" >
		<table class="code_table">
			<tr>
				<th>코드 분류</th>
				<th>코드 값</th>
			</tr>

			<tr>
				<td>
				    <select name="code_name" id="codeNameSelect">
				        <c:forEach var="c" items="${requestScope.codeNames}">
				            <option value="${c}">${c}</option>
				        </c:forEach>
				    </select>
				    <span id="add" class="add" onclick="addCodeName()">새로운 코드 분류 추가</span>
				    <input type="text" name="new_code_name" id="newCodeNameInput" placeholder="새로운 코드 분류 이름" style="display: none;">
				</td>

				<td><input type="text" name="code_value" placeholder="코드 값 입력" /></td>
			</tr>
			<tr>
				<td colspan="2"><input type="button" value="코드 추가하기"
					onclick="codeInsertToDB()" /></td>
			</tr>
			<c:if test="${empty requestScope.codeNames}">
				<tr>
					<td colspan="3">출력할 데이터가 없습니다.</td>
				</tr>
			</c:if>
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