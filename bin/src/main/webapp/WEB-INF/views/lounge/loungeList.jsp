<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lounge</title>
<link
rel="stylesheet"
type="text/css"
href="/resources/css/loungeAdmin.css"
/>
<script src="/resources/js/lounge.js"></script>
</head>
<body>

	<div class="title">
		<h2>커뮤니티 관리</h2>
		<h3>Lounge</h3>
	</div>

	<div class="search_wrap">
		<select name="search_category" id="l_search_category" >
			<option value="all">전체</option>
			<option value="free">자유 게시판</option>
			<option value="trouble">고민 상담소</option>
			<option value="sharing">지식 공유</option>
			<option value="friends">친구 찾기</option>
		</select>
		<select name="search_field" id="l_search_field">
			<option value="contents">제목+내용</option>
			<option value="id">작성자</option>
		</select>
		<input name="search_value" placeholder="검색어 입력" id="l_search_value" />
		<span onclick="searchLoungeList()">검색</span>
	</div>
	<table class="table lounge_list">
		<tr>
			<th>
				<input type="checkbox" id="selectall" value='selectall' onclick='select_lounge(this)' /> 
				<label for="selectall">전체</label>
			</th>
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

				<td class="expandable_row" onclick="showAllContents(event)">
					<p>${l.lounge_title}</p>
					<p class="full_text">${l.lounge_content}</p>
				</td>
				<td>${l.user_id}</td>
				<td>${l.regdate}</td>
				<td>${l.lounge_likes}</td>
				<td>${l.lounge_hits}</td>
				<td>${l.lounge_category}</td>
			</tr>
		</c:forEach>
		<tr>
			<!-- 페이징 버튼 추가 -->
			<td colspan="13">
				<div class="pagination_wrap">
					<c:if test="${not empty requestScope.loungePage}">
						<c:forEach var="pageNumber" begin="0"
							end="${requestScope.loungePage.totalPages - 1}">
							<span onclick="searchLoungeList(`${pageNumber}`)"
								class="${pageNumber == requestScope.loungePage.number ? 'currentPage' : ''}">
								${pageNumber + 1} </span>
						</c:forEach>
					</c:if>
				</div>
			</td>
		</tr>
	</table>
	<div class="lounge_btn">
		<input type="submit" value="게시글 삭제" onclick="deleteLounge()" />
		<span onclick="loungeInsert()">새글등록</span>
	</div>
</body>
</html>