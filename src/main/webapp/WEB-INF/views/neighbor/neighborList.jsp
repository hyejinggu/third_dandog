<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lounge</title>
</head>
<body>

	<h2>Lounge</h2>

	<hr>
	<table border="1" style="width: 100%">
		<tr>
			<th>번호</th>
			<th>상호명</th>
			<th>제목 및 내용</th>
			<th>별점</th>
			<th>작성자</th>
			<th>카테고리</th>
			<th>날짜</th>
		</tr>
		<c:forEach var="n" items="${requestScope.neighborList}">
			<tr>
				<td>${n.neighbor_no}</td>
				<td>${n.neighbor_brand_name}</td>
				<td><h4>${n.neighbor_title}</h4>
					<p>${n.neighbor_content}</p></td>
				<td>${n.neighbor_rating}</td>
				<td>${n.user_id}</td>
				<td>${n.neighbor_category}</td>
				<td>${n.regdate}</td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>