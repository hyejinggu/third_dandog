<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Event</title>
<script src="/resources/js/event.js"></script>
</head>
<body>

	<h2>Event</h2>

	<hr>
	<div>
		<select name="search_category" id="e_search_category" onchange="toggleSearchOptions()">
			<option value="name">이벤트 이름</option>
			<option value="date">기간 검색</option>
		</select> 
		<span class="search_name" id="e_search_name"> 
			<select name="e_search_field">
				<option value="contents">제목+내용</option>
			</select> 
			<input name="search_value" placeholder="검색어 입력" id="e_search_value" />
		</span> 
		<span class="search_date" id="e_search_date" style="display: none;">
			<span>시작 날짜</span> <input type="date" name="e_reg_date" id="e_reg_date" /> 
			<span>종료 날짜</span> <input type="date" name="e_exp_date" id="e_exp_date" />
		</span> 
		
		<input type="submit" value="검색" onclick="searchEventList()" />
	</div>

	<table border="1" style="width: 90%">
		<tr>
			<th>선택</th>
			<th>번호</th>
			<th>이름</th>
			<th>사진</th>
			<th>시작 날짜</th>
			<th>종료 날짜</th>
		</tr>
		<c:forEach var="e" items="${requestScope.eventList}">
			<tr>
				<td><input type="checkbox" name="selectedItem"
					class="event_check" value="${e.event_no}" /></td>
				<td>${e.event_no}</td>
				<td>${e.event_name}</td>
				<td><img alt="EventImage" src="/${e.event_img}" width="50"
					height="70"></td>
				<td>${e.e_reg_date}</td>
				<td>${e.e_exp_date}</td>
			</tr>
		</c:forEach>
	</table>
	<div>
		<input type="checkbox" id="selectall" value='selectall'
			onclick='select_event(this)' /> <label for="selectall">전체 선택</label>
	</div>
	<input type="submit" value="이벤트 삭제" onclick="deleteEvent()" />
	<div onclick="eventInsert()">이벤트 등록</div>
</body>
</html>