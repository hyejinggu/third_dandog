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
	<table border="1" style="width: 90%">
		<tr>
			<th>번호</th>
			<th>이미지</th>
			<th>제목 및 내용</th>
			<th>작성자</th>
			<th>날짜</th>
			<th>추천수</th>
			<th>조회수</th>
		</tr>
		<c:forEach var="l" items="${requestScope.lounge}">
			<tr>
				<td>${l.lounge_no}</td>

				<td><img alt="MyImage" src="/${l.lounge_img}" width="50" height="70"></td>

				<td><h4>${l.lounge_title}</h4>
					<p>${l.lounge_content}</p></td>

				<td>${l.user_id}</td>

				<td>${l.regdate}</td>

				<td>${l.lounge_likes}</td>

				<td>${l.lounge_hits}</td>
			</tr>
		</c:forEach>
	</table>
	<a href="loungeInsert">새글등록</a>
</body>
</html>