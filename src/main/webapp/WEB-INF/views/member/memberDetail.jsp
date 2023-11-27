<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Member Detail</title>
</head>
<body>
	<h2>Member Detail</h2>
	<table>
		<c:if test="${not empty requestScope.memberList}">
			<tr height="40">
				<th bgcolor="Thistle">I D</th>
				<td>${s.user_id}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">Password</th>
				<td>${s.user_password}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">Name</th>
				<td>${s.user_name}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">user_birthday</th>
				<td>${s.user_birthday}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">user_phonenum</th>
				<td>${s.user_phonenum}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">user_email</th>
				<td>${s.user_email}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">ani_name</th>
				<td>${s.ani_name}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">ani_birthday</th>
				<td>${s.ani_birthday}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">ani_type</th>
				<td>${s.ani_type}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">ani_info</th>
				<td>${s.ani_info}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">post_code</th>
				<td>${s.post_code}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">user_address1</th>
				<td>${s.user_address1}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">user_address2</th>
				<td>${s.user_address2}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Thistle">point</th>
				<td>${s.point}</td>
			</tr>
	<tr height="40">
				<th bgcolor="Thistle">withdrawal_date</th>
				<td>${s.withdrawal_date}</td>
			</tr> 
			
		</c:if>
		<c:if test="${empty requestScope.memberList}">
			<tr>
				<td colspan="7">잘못된 접근입니다.</td>
			</tr>
		</c:if>
	</table>
	<h4>
		<a href="/home">Home으로 가기</a>
	</h4>
</body>
</html>