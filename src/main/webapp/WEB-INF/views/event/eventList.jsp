<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Event</title>
<link
rel="stylesheet"
type="text/css"
href="/resources/css/eventAdmin.css"
/>
<script src="/resources/js/event.js"></script>
</head>
<body>
	<div class="title">
		<h2>커뮤니티 관리</h2>
		<h3>Event</h3>
	</div>

	<div class="search_wrap">
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

	<table class="table event_list">
		<tr>
			<th>
				<input type="checkbox" id="selectall" value='selectall' onclick='select_event(this)' /> 
				<label for="selectall">전체</label>
			</th>
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
	<div class="event_btn">
		<input type="submit" value="이벤트 삭제" onclick="deleteEvent()" class="delete_btn" />
		<span onclick="eventInsert()">이벤트 등록</span>
	</div>
</body>
</html>