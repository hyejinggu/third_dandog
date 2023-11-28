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
</head>
<body>
	<h2>lounge Insert</h2>

	<form action="loungeUpload" method="post" enctype="multipart/form-data" >
		<table>

			<tr height="40">
				<th>제목</th>
				<td><select name="lounge_category">
						<option value="자유 게시판"
							${requestScope.loungeinsert.lounge_category=="자유 게시판" ? "selected" : ""}>
							자유 게시판</option>
						<option value="고민 상담소"
							${requestScope.loungeinsert.lounge_category=="고민 상담소" ? "selected" : ""}>
							고민 상담소</option>
						<option value="지식 공유"
							${requestScope.loungeinsert.lounge_category=="지식 공유" ? "selected" : ""}>
							지식 공유</option>
						<option value="친구 찾기"
							${requestScope.loungeinsert.lounge_category=="친구 찾기" ? "selected" : ""}>
							친구 찾기</option>
				</select><input type="text" name="lounge_title" size="50"></td>
			</tr>
			<tr height="40">
				<th>내용</th>
				<td><textarea rows="5" cols="50" name="lounge_content"></textarea>
				</td>
			</tr>
			<tr height="40">
				<th>이미지 첨부</th>
				<td><img src="" class="select_img"><br> <input
					type="file" name="lounge_imgf" id="lounge_imgf" size="20">
				</td>
			</tr>
			<tr height="40">
				<th></th>
				<td><input type="submit" value="등록"></td>
			</tr>
		</table>
	</form>
</body>
</html>