<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>lounge Insert</title>
<link
rel="stylesheet"
type="text/css"
href="/resources/css/eventAdmin.css"
/>
<script src="/resources/js/event.js"></script>
</head>
<body>
	<h2>Event Insert</h2>

	<form action="/community/eventUpload" method="post" enctype="multipart/form-data" >
		<table class="table">

			<tr>
				<th>이벤트 이름</th>
				<td><input type="text" name="event_name" size="50"></td>
			</tr>
			<tr>
				<th>이미지 첨부</th>
				<td>
					<img src="" class="select_img" id="preview_img1"><br> 
					<input type="file" name="event_imgToUpload" id="event_imgToUpload" size="20"
					onchange="previewImage(this, 'preview_img1')">
				</td>
			</tr>
			<tr>
				<th>이벤트 시작 날짜</th>
				<td><input type="date" name="e_reg_date"></td>
			</tr>
			<tr>
				<th>이벤트 종료 날짜</th>
				<td><input type="date" name="e_exp_date"></td>
			</tr>
		</table>
		<div class="event_btn">
			<input type="submit" value="등록">
		</div>
	</form>
</body>
</html>