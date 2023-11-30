<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Member list</title>
</head>

<body>
	<form action="/member/memberList" method="post">
		<c:if test="${not empty requestScope.message}">
				=> ${requestScope.message}<br>
			<hr>
		</c:if>
		<table border="1" style="width: 90%">
			<tr bgcolor="Orange">
				<th>user_id</th>
				<th>user_password</th>
				<th>user_name</th>
				<th>user_birthday</th>
				<th>user_phonenum</th>
				<th>user_email</th>
				<th>ani_name</th>
				<th>ani_birthday</th>
				<th>ani_type</th>
				<th>ani_info</th>
				<th>post_code</th>
				<th>user_address1</th>
				<th>user_address2</th>
				<th>point</th>
				<th>withdrawal_date</th>
				<th>reg date</th>

				<!-- 관리자 기능 추가 -->
				<c:if test="${sessionScope.loginID=='admin'}">
					<th>Delete</th>
				</c:if>
			</tr>
			<c:if test="${not empty requestScope.memberList}">
				<c:forEach var="s" items="${requestScope.memberList}">
					<tr>
						<td>${s.user_id}</td>
						<td>${s.user_password}</td>
						<td>${s.user_name}</td>
						<td>${s.user_birthday}</td>
						<td>${s.user_phonenum}</td>
						<td>${s.user_email}</td>
						<td>${s.ani_name}</td>
						<td>${s.ani_birthday}</td>
						<td>${s.ani_type}</td>
						<td>${s.ani_info}</td>
						<td>${s.post_code}</td>
						<td>${s.user_address1}</td>
						<td>${s.user_address2}</td>
						<td>${s.point}</td>
						<td>${s.withdrawal_date}</td>
						<td>${s.regdate}</td>
						<!-- 관리자 기능 추가 -->
						<td align="center"><a href="mdelete?id=${s.user_id}">삭제</a></td>


					</tr>
				</c:forEach>
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
	</form>
</body>

</html>