<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lounge</title>
<script src="/resources/js/lounge.js"></script>
</head>
<body>

	<h2>Lounge</h2>

	<hr>
	<select name="search_category">
		<option value="all">전체</option>
		<option value="free">자유 게시판</option>
		<option value="trouble">고민 상담소</option>
		<option value="sharing">지식 공유</option>
		<option value="friends">친구 찾기</option>
	</select>
	<select name="search_feild">
		<option value="contents">제목+내용</option>
		<option value="id">작성자</option>
	</select>
	<input name="search_value" placeholder="검색어 입력" />
	<input type="submit" value="검색" onclick="searchList()" />

	<table border="1" style="width: 90%">
		<tr>
			<th>번호</th>
			<th>이미지</th>
			<th>제목 및 내용</th>
			<th>작성자</th>
			<th>날짜</th>
			<th>추천수</th>
			<th>조회수</th>
			<th>카테고리</th>
		</tr>
		<c:forEach var="l" items="${requestScope.loungeList}">
			<tr>
				<td><input type="checkbox" name="selectedItem" class="lounge_check"
					value="${l.lounge_no}" /></td>
				<td>${l.lounge_no}</td>

				<td><img alt="MyImage" src="/${l.lounge_img}" width="50"
					height="70"></td>

				<td><h4>${l.lounge_title}</h4>
					<p>${l.lounge_content}</p></td>

				<td>${l.user_id}</td>
				<td>${l.regdate}</td>
				<td>${l.lounge_likes}</td>
				<td>${l.lounge_hits}</td>
				<td>${l.lounge_category}</td>
			</tr>
		</c:forEach>
	</table>
	<div>
		<input type="checkbox" id="selectall" value='selectall'
			onclick='select_lounge(this)' /> <label for="selectall">전체 선택</label>
	</div>
	<input type="submit" value="delete_lounge" onclick="deleteLounge()" />
	<div onclick="loungeInsert()">새글등록</div>
</body>
</html>