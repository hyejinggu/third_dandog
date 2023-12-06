<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>lounge Insert</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/myStyle.css">
	<script src="/resources/js/event.js"></script>
</head>
<body>
	<h2>lounge Insert</h2>

	<form action="/community/eventUpload" method="post" enctype="multipart/form-data" >
		<table>

			<tr height="40">
				<td>이벤트 이름</td>
				<td><input type="text" name="event_name" size="50"></td>
			</tr>
			<tr height="40">
				<th>이미지 첨부</th>
				<td>
					<img src="" class="select_img">
					<input type="file" name="event_imgToUpload" id="event_imgToUpload" size="20">
				</td>
			</tr>
			<tr height="40">
				<th>이벤트 시작 날짜</th>
				<td><input type="date" name="e_reg_date"></td>
			</tr>
			<tr height="40">
				<th>이벤트 종료 날짜</th>
				<td><input type="date" name="e_exp_date"></td>
			</tr>
			<tr height="40">
				<th></th>
				<td><input type="submit" value="등록"></td>
			</tr>
		</table>
	</form>
</body>
</html>