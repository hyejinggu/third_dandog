<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Event</title>
</head>
<body>

	<h2>Event</h2>

	<hr>
	<table border="1" style="width: 90%">
		<tr>
			<th>번호</th>
			<th>이름</th>
			<th>사진</th>
			<th>시작 날짜</th>
			<th>종료 날짜</th>
		</tr>
		<c:forEach var="e" items="${requestScope.eventList}">
			<tr>
				<td>${e.event_no}</td>
				<td>${e.event_name}</td>
				<td><img alt="EventImage" src="/${e.event_img}" width="50" height="70"></td>
				<td>${e.e_reg_date}</td>
				<td>${e.e_exp_date}</td>
			</tr>
		</c:forEach>
	</table>
	<span onclick="eventInsert()">이벤트 등록</span>
</body>
</html>